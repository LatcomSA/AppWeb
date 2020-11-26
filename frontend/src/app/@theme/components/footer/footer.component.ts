import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
    ©2020  by <b><a href="https://latcom.com.co/" target="_blank">Latcom SA</a></b>: Telecommunications, Contact center & BPO
    </span>
    <div class="socials">
      <a href="https://es-la.facebook.com/pages/category/Telecommunication-Company/Latcom-SA-1405223919711493/" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/latcom_sa?lang=es" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.linkedin.com/company/latcom-co" target="_blank" class="ion ion-social-linkedin"></a>
      <a href="#" target="_blank" class="ion ion-social-instagram"></a>
      <a href="#" target="_blank" class="ion ion-social-github"></a>
    </div>
  `,
})
export class FooterComponent {
}
