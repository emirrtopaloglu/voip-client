export default function slugify(input: string): string {
  // Türkçe karakterleri İngilizce karakterlere çevir
  const turkishToEnglish: Record<string, string> = {
    ı: "i",
    ğ: "g",
    ü: "u",
    ş: "s",
    ç: "c",
    ö: "o",
    İ: "i",
    Ğ: "g",
    Ü: "u",
    Ş: "s",
    Ç: "c",
    Ö: "o",
  };

  input = input.toLowerCase();

  // Türkçe karakterleri İngilizce karakterlere çevir
  input = input.replace(/[ığüşçöİĞÜŞÇÖ]/g, (match) => turkishToEnglish[match]);

  // Harf dışındaki karakterleri "-" ile değiştir
  input = input.replace(/[^a-zA-Z0-9]+/g, "-");

  // Başta ve sonda "-" karakterlerini kaldır
  input = input.replace(/^-+|-+$/g, "");

  return input;
}
