"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGuard = void 0;
class AdminGuard {
    canActivate(context) {
        console.log('Inside canActivate() method of AdminGuard');
        const request = context.switchToHttp().getRequest();
        if (request.currentUser) {
            return request.currentUser.admin;
        }
        return false;
    }
}
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=admin.guard.js.map