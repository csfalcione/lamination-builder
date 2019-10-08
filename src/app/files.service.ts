import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver'

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor() { }

  public readTextFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.addEventListener('load', () => resolve(reader.result as string))
      reader.addEventListener('error', err => reject(`Error reading ${file.name}: ${err}`))

      reader.readAsText(file)
    })
  }

  public saveTextFile(filename: string, content: string, mimeType: string) {
    return saveAs(new Blob([content]), filename, {type: mimeType})
  }

}
