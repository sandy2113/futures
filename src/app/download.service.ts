import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) { }

  downloadPdf(): void {
    const pdfUrl = 'assets/Solution.pdf'; 

    this.http.get(pdfUrl, { responseType: 'arraybuffer' }).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'Solution.pdf';
      link.click();
    });
  }

}
