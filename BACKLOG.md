## Model/Class larınızı buna uygun olacak şekilde;

- [ ] Bina, Oda, Depo olacak. Binaya bağlı birden fazla oda ve depo olabilir. Bir odanın birden fazla bina ile bağlantısı olamaz.
- [ ] Envanter/Ürün olacak. Envanter/Ürün depoda saklanacak. Bir envanter/ürün birden fazla depoda olabilir.
- [ ] (Opsiyonel +) Depo Giriş ve Depo Çıkış olacak. Kullanıcı bir ürün eklediğinde o hangi depoya eklediyse orada görünecek. Çıkış yaptığında hangi binaya ve odaya ürünün gittiğini görebilecek.
- [ ] (Opsiyonel +) İş Emri tanımı olacak. Bu tanımı bina/oda/depo için veya envanter/ürün için bakım talepleri gibi düşünebilirsiniz. İş Emri tanımları xxx binadaki xxx odada bulunan xxx kodlu ürünün bakımı/temizliği/kontrolü şeklinde bir yapıda olacak.  

## Veritabanı
- [ ] MySQL, MsSQL veya PostgreSQL olabilir. Tercih size ait.
- [ ] Tablolar oluştururken basit veritabanı kuralları olmasına dikkat edilmeli. Örn. Index olması, ForeignKey olması ve doğru şekilde bağlanmış olması vb.

## Kodlama 
- [X] Back-end çok katmanlı bir mimaride olacak. Data, Service ve WebApi katmanları olacaktır.
- [ ] Arayüz seçimi size ait olmakla birlikte Reactjs, MVC veya Razor Page yöntemlerinden birini tercih edebilirsiniz. 
- [ ] Entity Framework yapısı kullanılacak
- [ ] Arayüzde bina/oda/depo ekleme, silme, güncelleme listeme gibi ekranlar olacak.
- [ ] (Opsiyonel +) Birbiri ile bağlantılı tablolar tek ekranda olabilir. Yani Bina tanım ekranına girildiğinde hem binaları hem de bu binaya ait oda ve depoları listeleyebileceğiniz, ekleyebileceğiniz, silebileceğiniz bir ekran olabilir.
- [ ] Arayüzde bulunan haberleşme için ASP.NET WebAPI kullanılacak. Tüm işlemler(CRUD) için arayüzden Web API niz çağırılacak ve işlemler Web API üzerinden gerçekleştirilecektir. Örn. Bina ekleme yapmak istendiğinde formdan aldığınız bina bilgileri api/buildings/addbuilding şeklinde Web API nize gidecek. Bu Web API oluşturduğunuz Bina modelini alacak ve veritabanına ekleme yapacaktır.
- [ ] Web API niz için Swagger arayüzü oluşturabilirsiniz.
- [ ] Web API nizin güvenliği için Authorization ve Authentication eklenecek. Kullanıcı login olacak ve bir token alacak. Diğer metotlar bu token olmadan çalışmayacak. Kullanıcı 401 hatası alacak.
    - [ ] (Opsiyonel +) Loglama
    - [ ] (Opsiyonel +) Exception Handling
    - [ ] (Opsiyonel +) Localization
