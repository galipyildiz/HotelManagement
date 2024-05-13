### Model/Class larınızı buna uygun olacak şekilde;

- [x] Bina, Oda, Depo olacak. Binaya bağlı birden fazla oda ve depo olabilir. Bir odanın birden fazla bina ile bağlantısı olamaz.
- [x] Envanter/Ürün olacak. Envanter/Ürün depoda saklanacak. Bir envanter/ürün birden fazla depoda olabilir.
- [x] (Opsiyonel +) Depo Giriş ve Depo Çıkış olacak. Kullanıcı bir ürün eklediğinde o hangi depoya eklediyse orada görünecek. Çıkış yaptığında hangi binaya ve odaya ürünün gittiğini görebilecek.
- [ ] (Opsiyonel +) İş Emri tanımı olacak. Bu tanımı bina/oda/depo için veya envanter/ürün için bakım talepleri gibi düşünebilirsiniz. İş Emri tanımları xxx binadaki xxx odada bulunan xxx kodlu ürünün bakımı/temizliği/kontrolü şeklinde bir yapıda olacak.

### Veritabanı

- [x] MySQL, MsSQL veya PostgreSQL olabilir. Tercih size ait.
- [x] Tablolar oluştururken basit veritabanı kuralları olmasına dikkat edilmeli. Örn. Index olması, ForeignKey olması ve doğru şekilde bağlanmış olması vb.

### Kodlama

- [x] Back-end çok katmanlı bir mimaride olacak. Data, Service ve WebApi katmanları olacaktır.
- [x] Arayüz seçimi size ait olmakla birlikte Reactjs, MVC veya Razor Page yöntemlerinden birini tercih edebilirsiniz.
- [x] Entity Framework yapısı kullanılacak
- [x] Arayüzde bina/oda/depo ekleme, silme, güncelleme listeme gibi ekranlar olacak.
- [x] (Opsiyonel +) Birbiri ile bağlantılı tablolar tek ekranda olabilir. Yani Bina tanım ekranına girildiğinde hem binaları hem de bu binaya ait oda ve depoları listeleyebileceğiniz, ekleyebileceğiniz, silebileceğiniz bir ekran olabilir.
- [x] Arayüzde bulunan haberleşme için ASP.NET WebAPI kullanılacak. Tüm işlemler(CRUD) için arayüzden Web API niz çağırılacak ve işlemler Web API üzerinden gerçekleştirilecektir. Örn. Bina ekleme yapmak istendiğinde formdan aldığınız bina bilgileri api/buildings/addbuilding şeklinde Web API nize gidecek. Bu Web API oluşturduğunuz Bina modelini alacak ve veritabanına ekleme yapacaktır.
- [x] Web API niz için Swagger arayüzü oluşturabilirsiniz.
- [x] Web API nizin güvenliği için Authorization ve Authentication eklenecek. Kullanıcı login olacak ve bir token alacak. Diğer metotlar bu token olmadan çalışmayacak. Kullanıcı 401 hatası alacak.
- [ ] (Opsiyonel +) Loglama
- [ ] (Opsiyonel +) Exception Handling
- [x] (Opsiyonel +) Localization

---

# Quick examples

- `feat: new feature`
- `fix(scope): bug in scope`
- `feat!: breaking change` / `feat(scope)!: rework API`
- `chore(deps): update dependencies`

# Commit types

- `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- `ci`: Changes to CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **`chore`: Changes which doesn't change source code or tests e.g. changes to the build process, auxiliary tools, libraries**
- `docs`: Documentation only changes
- **`feat`: A new feature**
- **`fix`: A bug fix**
- `perf`: A code change that improves performance
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `revert`: Revert something
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `test`: Adding missing tests or correcting existing tests

# Reminders

- Put newline before extended commit body
- More details at **[conventionalcommits.org](https://www.conventionalcommits.org/)**
- https://gist.github.com/Zekfad/f51cb06ac76e2457f11c80ed705c95a3
