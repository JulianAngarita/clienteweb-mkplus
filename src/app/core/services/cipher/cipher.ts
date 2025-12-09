import { Injectable } from '@angular/core';
import CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root',
})
export class CipherService {
  public desencriptarData = (encryptedData: { iv: string; data: string }): string => {
    const token = JSON.parse(localStorage.getItem("token") ?? '');
    if (!token) throw new Error("No hay token en localStorage");
    const key = CryptoJS.SHA256(token);
    const iv = CryptoJS.enc.Hex.parse(encryptedData.iv);
    const decrypted = CryptoJS.AES.decrypt(encryptedData.data, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  };
}
