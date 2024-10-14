import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-collage',
  templateUrl: './collage.component.html',
  styleUrls: ['./collage.component.css']
})
export class CollageComponent {
  image1: string | ArrayBuffer | null = null;
  image2: string | ArrayBuffer | null = null;

  @ViewChild('collageContainer', { static: false }) collageContainer!: ElementRef;

  onFileChange(event: Event, imageNumber: number) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (result) {
          if (imageNumber === 1) {
            this.image1 = result;
          } else {
            this.image2 = result;
          }
        }
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  }

  downloadCollage() {
    const collageElement = this.collageContainer.nativeElement;
    html2canvas(collageElement).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'collage.png';
      link.click();
    });
  }
}
