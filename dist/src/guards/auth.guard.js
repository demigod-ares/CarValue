"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
class AuthGuard {
    canActivate(context) {
        console.log('Inside canActivate() method of AuthGuard');
        const request = context.switchToHttp().getRequest();
        return request.session.userId;
    }
}
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map