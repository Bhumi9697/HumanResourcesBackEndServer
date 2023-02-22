import { AuthenticationError } from 'apollo-server-lambda';
import * as dbDocuments from '../dynamo/CavnessDocuments';
import { getMyCompanyDocuments } from './methods/documents';

class AccessControl {

    constructor(){
    }

    _throwError(){
        throw new AuthenticationError('User does not have sufficient privilages');
    }

    setUser(user){
        this.user = user;
        this.userId = user.userId;
        this.userRole = user.userRole;
        this.companyId = user.companyId;
    }

    _isAdmin(){
        if(this.userRole == 'superadmin' || this.userRole == 'accountmanager'){
            return true;
        }
       return false;
    }

    _isCompanyAdmin(){
        if(this.userRole == 'owner' || this.userRole == 'hr'){
            return true;
        }
        return false;
    }

    _sameCompany(companyId){
        if(this.companyId == companyId){
            return true;
        }
    }

    _isCompanyResource(resource){
        if(resource.companyId == this.companyId){
            return true;
        }
    }

    _isSelfOwned(resource){
        console.log('this userId:',this.userId);
        console.log('resource:',resource);
        if(resource && resource.userDocId){
           return this.userId === this._getUserId(resource.userDocId);
        }
        if(this.userId === resource.userId){
            return true;
        }
        return false;
    }

    _getUserId(userDocId){
        let arr = userDocId.split('$');
        return arr[0];
    }

    adminOnly(){
        if(this._isAdmin()){
            return;
        }
        this._throwError();
    }

    companyAdmin(){
        if(this._isAdmin()){
            return true;
        }
        if(this._isCompanyAdmin()){
            return true;
        }
        this._throwError();
    }

    sameCompanyOrAdmin(args){
        if(this._isAdmin()){
            return true;
        }
        if(this.companyId == args.companyId){
            return true;
        }
        this._throwError();
    }

    employeeOrCompanyAdmin(resource){
        if(this._isAdmin()){
            return true;
        }
        if(this._isCompanyAdmin() && this._sameCompany(resource.companyId)){
            return true;

        }
        if(this._isSelfOwned(resource)){
            return true;
        }
        this._throwError();
    }

    async canViewDoc(document){
        if(this._isAdmin()){
            return true;
        }
        let viewableDocs = await getMyCompanyDocuments(this.companyId);
        if (viewableDocs.some(e => e.documentId === document.documentId)) {
            return true;
        }
        this._throwError();
    }

    async canViewPrivateDoc(employeeDocument){
        if(this._isAdmin()){
            return true;
        }

        if(this.isCompanyAdmin && this._sameCompany(employeeDocument.companyId)){
            return true;
        }

        let viewableDocs = await getMyCompanyDocuments(this.companyId);
        if (viewableDocs.some(e => e.documentId === employeeDocument.documentId)) {
            return true;
        }
        this._throwError();
    }

    async canEditDoc(document){
        let doc = await dbDocuments.getDocument(document);
        if(this._isAdmin()){
            return true;
        }
        if(this._isCompanyAdmin()){
            if(doc && doc.updatedBy && doc.updatedBy.companyId === this.companyId ){
                return true;
            }
        }
        this._throwError();
    }

    canCreateDoc(document){
        if(this._isAdmin()){
            return true;
        }
        if(this._isCompanyAdmin()){
            if(document.updatedBy.companyId === this.companyId && document.documentType === 'company'){
                return true;
            }
        }
        this._throwError();
    }

    canModifyUser(newUser){
        if(newUser.userId === this.userId){
            return true;
        }
       if(this.userRole === 'accountmanager'){
           if(newUser.userRole === 'superadmin'){
               return false;
           }
           return true;
       }
       if(this.userRole === 'owner' || this.userRole === 'hr'){
           if(newUser.userRole === 'hr' || newUser.userRole === 'employee'){
               if(this._sameCompany(newUser.companyId)){
                    return true;
               }
           }
       }
       return false;
    }

    canCreateUser(newUser){
        if(this.userRole === 'superadmin'){
            return true;
        }
    // account manager can create all but superadmin
       if(this.userRole === 'accountmanager'){
           if(newUser.userRole === 'superadmin'){
               return false;
           }
           return true;
       }
     // company admins can create hr and employees
       if(this.userRole === 'owner' || this.userRole === 'hr'){
           if(newUser.userRole === 'hr' || newUser.userRole === 'employee'){
               if(this._sameCompany(newUser.companyId)){
                    return true;
               }
           }
       }
       this._throwError();
    }

    canViewUser(user){
       if(this._isAdmin()){
            return true;
       }

       if(this._isCompanyResource(user)){
           return true;
       }

       if(this._isSelfOwned(user)){
           return true;
       }
       this._throwError();
    }
}

export default new AccessControl();