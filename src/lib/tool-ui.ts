export const toolUi = (lang: string) => {
  const map = {
    vi: { input:'Đầu vào', output:'Kết quả', clear:'Xóa', sample:'Mẫu', copy:'Sao chép', copied:'Đã sao chép', download:'Tải xuống', empty:'Vui lòng nhập dữ liệu.', process:'Xử lý' },
    en: { input:'Input', output:'Result', clear:'Clear', sample:'Sample', copy:'Copy', copied:'Copied', download:'Download', empty:'Please enter some data.', process:'Process' },
    es: { input:'Entrada', output:'Resultado', clear:'Limpiar', sample:'Ejemplo', copy:'Copiar', copied:'Copiado', download:'Descargar', empty:'Introduce datos.', process:'Procesar' },
    fr: { input:'Entrée', output:'Résultat', clear:'Effacer', sample:'Exemple', copy:'Copier', copied:'Copié', download:'Télécharger', empty:'Saisissez des données.', process:'Traiter' },
    de: { input:'Eingabe', output:'Ergebnis', clear:'Leeren', sample:'Beispiel', copy:'Kopieren', copied:'Kopiert', download:'Download', empty:'Bitte Daten eingeben.', process:'Verarbeiten' },
    ja: { input:'入力', output:'結果', clear:'クリア', sample:'サンプル', copy:'コピー', copied:'コピー済み', download:'ダウンロード', empty:'データを入力してください。', process:'処理' },
  } as const;
  return map[lang as keyof typeof map] ?? map.en;
};
