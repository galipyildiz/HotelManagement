import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  .use(initReactI18next) // React entegrasyonu
  .use(LanguageDetector) // Tarayıcı dil algılayıcısı
  .use(HttpBackend) // Sunucudan çeviri dosyalarını yüklemek için
  .init({
    fallbackLng: "en", // Varsayılan dil
    debug: true, // Geliştirme sırasında hata ayıklama bilgileri
    detection: {
      order: ["queryString", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Çeviri dosyalarının yolu
    },
  });

export default i18n;
