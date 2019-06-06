import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import * as CryptoJs from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let _token = sessionStorage.getItem('token');
    if (typeof _token != undefined && _token) {
      return true;
    }
    return false;
  }

  // #region Encryption/Decryption
  EncryptText(normalText: string, EncryptionKey: string) {
    return CryptoJs.AES.encrypt(normalText.toString().trim(), EncryptionKey).toString();
  }

  DecryptText(encryptedText: string, EncryptionKey: string) {
    return CryptoJs.AES.decrypt(encryptedText.toString().trim(), EncryptionKey).toString(CryptoJs.enc.utf8);
  }
  // #endregion Encryption/Decryption

}
