import { locales, type SiteLocale } from './site';

export const seoToolKeys = [
  'sql-formatter',
  'json-validator',
  'csv-to-json',
  'css-minify',
  'hash-generator',
  'url-encoder-decoder',
] as const;

export type SeoToolKey = (typeof seoToolKeys)[number];

type ContextKey =
  | 'database'
  | 'api'
  | 'debug'
  | 'config'
  | 'spreadsheet'
  | 'performance'
  | 'deployment'
  | 'security'
  | 'encoding';

export interface SeoIntent {
  slug: string;
  focus: string;
  context: ContextKey;
  sampleLabel: string;
}

export interface SeoToolDefinition {
  key: SeoToolKey;
  name: string;
  mainPath: string;
  intents: SeoIntent[];
}

const toolDefinitions: Record<SeoToolKey, SeoToolDefinition> = {
  'sql-formatter': {
    key: 'sql-formatter',
    name: 'SQL Formatter',
    mainPath: 'sql-formatter',
    intents: [
      ['mysql-query-formatter', 'MySQL queries', 'database', 'MySQL SELECT and JOIN statements'],
      ['postgresql-query-formatter', 'PostgreSQL queries', 'database', 'PostgreSQL CTE and JSON queries'],
      ['sql-server-query-formatter', 'SQL Server queries', 'database', 'T-SQL statements'],
      ['sqlite-query-formatter', 'SQLite queries', 'database', 'SQLite schema and SELECT queries'],
      ['select-query-formatter', 'SELECT queries', 'database', 'long SELECT statements'],
      ['insert-query-formatter', 'INSERT queries', 'database', 'multi-row INSERT statements'],
      ['update-query-formatter', 'UPDATE queries', 'database', 'UPDATE statements with conditions'],
      ['delete-query-formatter', 'DELETE queries', 'database', 'DELETE statements with filters'],
      ['join-query-formatter', 'JOIN queries', 'database', 'multi-table JOIN statements'],
      ['subquery-formatter', 'SQL subqueries', 'database', 'nested subqueries'],
      ['stored-procedure-formatter', 'stored procedure SQL', 'database', 'stored procedure bodies'],
      ['sql-minifier-online', 'SQL minification', 'performance', 'SQL prepared for compact storage'],
      ['sql-prettifier-online', 'SQL prettifying', 'debug', 'hard-to-read SQL copied from logs'],
      ['sql-debugging-formatter', 'SQL debugging', 'debug', 'queries being reviewed for errors'],
      ['api-sql-formatter', 'SQL from API logs', 'api', 'SQL captured from backend logs'],
      ['database-migration-sql-formatter', 'database migration SQL', 'deployment', 'migration scripts'],
      ['analytics-sql-formatter', 'analytics SQL', 'database', 'reporting and warehouse queries'],
      ['long-sql-query-formatter', 'very long SQL queries', 'debug', 'large generated SQL statements'],
    ].map(([slug, focus, context, sampleLabel]) => ({ slug, focus, context: context as ContextKey, sampleLabel })),
  },
  'json-validator': {
    key: 'json-validator',
    name: 'JSON Validator',
    mainPath: 'json-validator',
    intents: [
      ['api-response-validator', 'API response JSON', 'api', 'REST API response payloads'],
      ['json-beautifier-online', 'JSON beautifying', 'debug', 'minified JSON payloads'],
      ['json-minifier-online', 'JSON minification', 'performance', 'JSON prepared for compact transfer'],
      ['json-syntax-checker', 'JSON syntax checking', 'debug', 'JSON with possible syntax errors'],
      ['json-parser-online', 'JSON parsing', 'debug', 'raw JSON copied from logs'],
      ['nested-json-validator', 'nested JSON', 'debug', 'deeply nested objects and arrays'],
      ['large-json-validator', 'large JSON documents', 'debug', 'large JSON documents'],
      ['webhook-json-validator', 'webhook JSON', 'api', 'webhook request bodies'],
      ['rest-api-json-validator', 'REST API JSON', 'api', 'request and response payloads'],
      ['config-json-validator', 'configuration JSON', 'config', 'application configuration files'],
      ['package-json-validator', 'package.json content', 'config', 'package.json content pasted as text'],
      ['tsconfig-json-validator', 'tsconfig-style JSON', 'config', 'TypeScript configuration JSON'],
      ['json-debugger-online', 'JSON debugging', 'debug', 'malformed JSON from an application'],
      ['json-pretty-print-online', 'JSON pretty printing', 'debug', 'compact JSON that needs indentation'],
      ['json-error-finder', 'JSON error finding', 'debug', 'JSON that fails to parse'],
      ['json-array-validator', 'JSON arrays', 'debug', 'arrays of JSON objects'],
      ['json-object-validator', 'JSON objects', 'debug', 'object-shaped JSON payloads'],
      ['escaped-json-validator', 'escaped JSON text', 'debug', 'JSON strings copied from logs'],
    ].map(([slug, focus, context, sampleLabel]) => ({ slug, focus, context: context as ContextKey, sampleLabel })),
  },
  'csv-to-json': {
    key: 'csv-to-json',
    name: 'CSV to JSON Converter',
    mainPath: 'csv-to-json',
    intents: [
      ['excel-csv-to-json', 'Excel CSV exports', 'spreadsheet', 'CSV exported from Excel'],
      ['google-sheets-csv-to-json', 'Google Sheets CSV exports', 'spreadsheet', 'CSV exported from Google Sheets'],
      ['comma-csv-to-json', 'comma-delimited CSV', 'spreadsheet', 'standard comma-separated data'],
      ['semicolon-csv-to-json', 'semicolon-delimited CSV', 'spreadsheet', 'semicolon-separated data'],
      ['tab-delimited-to-json', 'tab-delimited data', 'spreadsheet', 'tab-separated rows'],
      ['csv-api-payload', 'CSV for API payloads', 'api', 'tabular data being prepared for an API'],
      ['csv-array-of-objects', 'CSV to array of objects', 'api', 'rows converted to keyed objects'],
      ['csv-with-headers-to-json', 'CSV with headers', 'spreadsheet', 'CSV whose first row contains field names'],
      ['csv-with-quotes-to-json', 'quoted CSV fields', 'spreadsheet', 'CSV containing commas inside quotes'],
      ['multiline-csv-to-json', 'multiline CSV fields', 'spreadsheet', 'CSV containing line breaks inside quoted fields'],
      ['large-csv-to-json', 'large CSV text', 'spreadsheet', 'larger pasted CSV datasets'],
      ['csv-json-pretty-print', 'pretty JSON from CSV', 'debug', 'CSV that needs readable JSON output'],
      ['csv-to-json-for-javascript', 'CSV to JSON for JavaScript', 'api', 'data prepared for frontend JavaScript'],
      ['csv-to-json-for-python', 'CSV to JSON for Python', 'api', 'data prepared for Python scripts'],
      ['csv-to-json-for-nodejs', 'CSV to JSON for Node.js', 'api', 'data prepared for Node.js services'],
      ['csv-to-json-for-rest-api', 'CSV to JSON for REST APIs', 'api', 'spreadsheet rows prepared for REST endpoints'],
      ['spreadsheet-to-json', 'spreadsheet data to JSON', 'spreadsheet', 'copied spreadsheet-style data'],
      ['export-csv-to-json', 'exported CSV to JSON', 'spreadsheet', 'CSV exported from business tools'],
    ].map(([slug, focus, context, sampleLabel]) => ({ slug, focus, context: context as ContextKey, sampleLabel })),
  },
  'css-minify': {
    key: 'css-minify',
    name: 'CSS Minifier',
    mainPath: 'css-minify',
    intents: [
      ['remove-css-whitespace', 'removing CSS whitespace', 'performance', 'stylesheets with unnecessary spacing'],
      ['css-compressor-online', 'CSS compression', 'performance', 'CSS before production delivery'],
      ['minify-stylesheet-online', 'stylesheet minification', 'performance', 'standalone stylesheet text'],
      ['production-css-minifier', 'production CSS', 'deployment', 'CSS prepared for deployment'],
      ['css-file-size-reducer', 'reducing CSS size', 'performance', 'CSS that needs a smaller transfer size'],
      ['css-performance-optimizer', 'CSS performance optimization', 'performance', 'stylesheets being optimized for faster delivery'],
      ['css-for-pagespeed', 'CSS for page speed', 'performance', 'CSS reviewed during performance work'],
      ['minify-bootstrap-css', 'Bootstrap CSS overrides', 'performance', 'custom Bootstrap override CSS'],
      ['minify-tailwind-output', 'generated Tailwind CSS snippets', 'performance', 'generated utility CSS pasted as text'],
      ['minify-wordpress-css', 'WordPress custom CSS', 'deployment', 'custom theme or plugin CSS'],
      ['minify-theme-css', 'theme CSS', 'deployment', 'theme stylesheet changes'],
      ['minify-critical-css', 'critical CSS', 'performance', 'small critical CSS blocks'],
      ['minify-media-queries', 'CSS media queries', 'performance', 'responsive media-query blocks'],
      ['minify-css-variables', 'CSS custom properties', 'performance', 'stylesheets using CSS variables'],
      ['remove-css-comments', 'removing CSS comments', 'performance', 'CSS containing development comments'],
      ['inline-css-minifier', 'inline CSS text', 'performance', 'CSS intended for inline delivery'],
      ['responsive-css-minifier', 'responsive CSS', 'performance', 'mobile and desktop responsive rules'],
      ['css-before-deploy', 'CSS before deployment', 'deployment', 'final stylesheet text before release'],
    ].map(([slug, focus, context, sampleLabel]) => ({ slug, focus, context: context as ContextKey, sampleLabel })),
  },
  'hash-generator': {
    key: 'hash-generator',
    name: 'Hash Generator',
    mainPath: 'hash-generator',
    intents: [
      ['md5-generator-online', 'MD5 text hashes', 'security', 'text that needs an MD5 checksum'],
      ['sha1-generator-online', 'SHA-1 text hashes', 'security', 'text that needs a SHA-1 digest'],
      ['sha256-generator-online', 'SHA-256 text hashes', 'security', 'text that needs a SHA-256 digest'],
      ['sha384-generator-online', 'SHA-384 text hashes', 'security', 'text that needs a SHA-384 digest'],
      ['sha512-generator-online', 'SHA-512 text hashes', 'security', 'text that needs a SHA-512 digest'],
      ['text-hash-generator', 'plain-text hashing', 'security', 'plain UTF-8 text'],
      ['string-checksum-generator', 'string checksums', 'security', 'strings compared for accidental changes'],
      ['content-fingerprint-generator', 'content fingerprints', 'security', 'text content that needs a reproducible fingerprint'],
      ['request-body-hash', 'request-body hashing', 'api', 'request-body text used in integrations'],
      ['webhook-payload-hash', 'webhook payload hashing', 'api', 'webhook payload text'],
      ['json-text-hash', 'JSON text hashing', 'api', 'serialized JSON text'],
      ['url-string-hash', 'URL string hashing', 'encoding', 'URL text used as a deterministic key'],
      ['cache-key-hash', 'cache-key hashing', 'performance', 'long cache-key strings'],
      ['message-digest-generator', 'message digests', 'security', 'messages checked for integrity'],
      ['utf8-text-hash', 'UTF-8 text hashes', 'security', 'Unicode text encoded as UTF-8'],
      ['browser-hash-generator', 'browser-based hashing', 'security', 'text processed locally in the browser'],
      ['offline-hash-generator', 'local hash generation', 'security', 'sensitive text that should stay on-device'],
      ['checksum-for-comparison', 'checksums for comparison', 'debug', 'two versions of text being compared'],
    ].map(([slug, focus, context, sampleLabel]) => ({ slug, focus, context: context as ContextKey, sampleLabel })),
  },
  'url-encoder-decoder': {
    key: 'url-encoder-decoder',
    name: 'URL Encoder / Decoder',
    mainPath: 'url-encoder-decoder',
    intents: [
      ['url-encode-online', 'URL encoding', 'encoding', 'full URLs containing spaces or Unicode'],
      ['url-decode-online', 'URL decoding', 'encoding', 'percent-encoded URLs'],
      ['encode-query-string', 'query-string encoding', 'encoding', 'query strings with special characters'],
      ['decode-query-string', 'query-string decoding', 'encoding', 'encoded search and filter parameters'],
      ['encode-url-parameter', 'URL parameter encoding', 'encoding', 'individual parameter values'],
      ['decode-url-parameter', 'URL parameter decoding', 'encoding', 'encoded parameter values'],
      ['encode-redirect-url', 'redirect URL encoding', 'encoding', 'nested redirect URL parameters'],
      ['decode-redirect-url', 'redirect URL decoding', 'encoding', 'encoded redirect targets'],
      ['encode-api-url', 'API URL encoding', 'api', 'API endpoints with query parameters'],
      ['decode-api-url', 'API URL decoding', 'api', 'encoded URLs copied from API logs'],
      ['encode-utm-url', 'UTM URL encoding', 'encoding', 'campaign URLs with tracking parameters'],
      ['decode-percent-encoding', 'percent-encoding decoding', 'encoding', 'percent-encoded strings'],
      ['percent-encode-string', 'percent encoding', 'encoding', 'text that must be safe inside a URL'],
      ['encode-path-segment', 'URL path-segment encoding', 'encoding', 'dynamic path values'],
      ['encode-search-query', 'search-query encoding', 'encoding', 'user search terms inserted into URLs'],
      ['decode-search-query', 'search-query decoding', 'encoding', 'encoded search terms from logs'],
      ['encode-callback-url', 'callback URL encoding', 'api', 'OAuth-style callback URLs used as parameters'],
      ['encode-webhook-url', 'webhook URL encoding', 'api', 'webhook endpoint URLs with parameters'],
    ].map(([slug, focus, context, sampleLabel]) => ({ slug, focus, context: context as ContextKey, sampleLabel })),
  },
};

export const seoLandingLocales = locales;
export const getSeoTool = (key: string) => toolDefinitions[key as SeoToolKey];
export const getSeoIntent = (tool: SeoToolKey, slug: string) => toolDefinitions[tool]?.intents.find((item) => item.slug === slug);
export const getSeoLandings = () => seoToolKeys.flatMap((tool) => toolDefinitions[tool].intents.map((intent) => ({ tool, intent })));

const copy: Record<SiteLocale, {
  free: string;
  title: (focus: string, tool: string) => string;
  description: (focus: string, tool: string) => string;
  heading: (focus: string) => string;
  intro: (focus: string, sample: string) => string;
  why: string;
  whyText: (focus: string) => string;
  use: string;
  useText: (sample: string) => string;
  privacy: string;
  privacyText: string;
  how: string;
  steps: string[];
  faq: string;
  q1: (focus: string) => string;
  a1: (tool: string) => string;
  q2: string;
  a2: string;
  q3: string;
  a3: string;
  related: string;
  openMain: string;
}> = {
  en: {
    free: 'Free online tool', title: (f,t)=>`${f} Online – Free ${t}`, description:(f,t)=>`Use JSNify for ${f.toLowerCase()} with a free ${t.toLowerCase()} that runs locally in your browser. No upload or sign-in required.`, heading:(f)=>`Work with ${f} directly in your browser`, intro:(f,s)=>`This page is focused on ${f.toLowerCase()}. It is designed for ${s.toLowerCase()}, with the real JSNify tool embedded below so you can complete the task without being redirected to another page.`, why:'Why this page is useful', whyText:(f)=>`Different workflows create different failure modes. This landing page keeps the explanation, examples, and related links centered on ${f.toLowerCase()} instead of repeating a generic tool description.`, use:'Typical use case', useText:(s)=>`A common workflow is working with ${s.toLowerCase()}. Paste the text into the tool, process it locally, review the result, then copy or download the output when available.`, privacy:'Privacy-first processing', privacyText:'The primary processing happens in your browser. JSNify does not require you to upload the pasted source text to a processing server for these tools.', how:'How to use it', steps:['Paste or load the text you want to process.','Choose the mode that matches your task.','Run the tool and review any validation message or transformed output.','Copy or download the result and continue your workflow.'], faq:'Frequently asked questions', q1:(f)=>`Can I use this page for ${f.toLowerCase()}?`, a1:(t)=>`Yes. The page embeds the working ${t} rather than acting as a doorway to another utility page.`, q2:'Do I need an account?', a2:'No. The current browser tools work without sign-in.', q3:'Is my pasted input sent to a processing API?', a3:'The tool logic runs client-side in the browser for the supported operations on this page.', related:'Related landing pages', openMain:'Open the main tool page',
  },
  vi: {
    free:'Công cụ online miễn phí', title:(f,t)=>`${f} Online – ${t} miễn phí`, description:(f,t)=>`Dùng JSNify cho ${f} với ${t} miễn phí, xử lý trực tiếp trên trình duyệt, không cần tải dữ liệu lên hay đăng nhập.`, heading:(f)=>`Xử lý ${f} trực tiếp trên trình duyệt`, intro:(f,s)=>`Landing page này tập trung riêng vào nhu cầu ${f}. Nội dung được xây quanh trường hợp ${s}; công cụ JSNify thật được nhúng ngay bên dưới nên bạn có thể thao tác tại chỗ, không phải đi qua một trang trung gian.`, why:'Vì sao trang này hữu ích', whyText:(f)=>`Mỗi quy trình có lỗi và mục tiêu khác nhau. Trang này tập trung giải thích, ví dụ và liên kết nội bộ cho ${f}, thay vì chỉ thay từ khóa trên một mô tả chung.`, use:'Trường hợp sử dụng điển hình', useText:(s)=>`Một tình huống phổ biến là ${s}. Dán dữ liệu vào công cụ, xử lý cục bộ, kiểm tra kết quả rồi sao chép hoặc tải xuống khi cần.`, privacy:'Xử lý ưu tiên riêng tư', privacyText:'Các thao tác chính được thực hiện ngay trong trình duyệt. Bạn không cần gửi phần dữ liệu đã dán lên máy chủ xử lý của JSNify.', how:'Cách sử dụng', steps:['Dán nội dung cần xử lý vào vùng nhập.','Chọn chế độ phù hợp với mục tiêu.','Chạy công cụ và kiểm tra thông báo hoặc kết quả đầu ra.','Sao chép hoặc tải kết quả để tiếp tục công việc.'], faq:'Câu hỏi thường gặp', q1:(f)=>`Trang này có dùng được cho ${f} không?`, a1:(t)=>`Có. Trang nhúng trực tiếp ${t} đang hoạt động thay vì chỉ chuyển bạn sang một trang công cụ khác.`, q2:'Có cần tài khoản không?', a2:'Không. Các công cụ trình duyệt hiện tại không yêu cầu đăng nhập.', q3:'Dữ liệu tôi dán có gửi tới API xử lý không?', a3:'Các thao tác được hỗ trợ trên trang này chạy phía client trong trình duyệt.', related:'Landing page liên quan', openMain:'Mở trang công cụ chính',
  },
  ja: {
    free:'無料オンラインツール', title:(f,t)=>`${f} オンライン – 無料 ${t}`, description:(f,t)=>`JSNify の ${t} で ${f} をブラウザ内で処理できます。アップロードやログインは不要です。`, heading:(f)=>`${f} をブラウザで処理`, intro:(f,s)=>`このページは ${f} の用途に特化し、${s} を扱うワークフロー向けに構成されています。実際に動作する JSNify ツールを同じページに配置しているため、中間ページへ移動する必要はありません。`, why:'このページが役立つ理由', whyText:(f)=>`${f} では一般的なツール説明だけでは不足することがあります。このページでは用途に合わせた説明、例、関連リンクをまとめています。`, use:'代表的な利用例', useText:(s)=>`${s} を扱う場合、入力を貼り付けてブラウザ内で処理し、結果を確認して必要に応じてコピーまたはダウンロードできます。`, privacy:'プライバシー重視', privacyText:'主要な処理はブラウザ内で実行されます。対応する操作のために入力内容を処理サーバーへアップロードする必要はありません。', how:'使い方', steps:['処理するテキストを入力します。','目的に合うモードを選びます。','ツールを実行して結果を確認します。','結果をコピーまたはダウンロードします。'], faq:'よくある質問', q1:(f)=>`${f} に使えますか？`, a1:(t)=>`はい。このページには実際に動作する ${t} が埋め込まれています。`, q2:'アカウントは必要ですか？', a2:'いいえ。現在のブラウザツールはログイン不要です。', q3:'入力データは処理 API に送信されますか？', a3:'このページで対応している処理はブラウザのクライアント側で実行されます。', related:'関連ページ', openMain:'メインツールを開く',
  },
  es: {
    free:'Herramienta online gratuita', title:(f,t)=>`${f} online – ${t} gratis`, description:(f,t)=>`Usa JSNify para ${f} con un ${t} gratuito que funciona localmente en tu navegador, sin subir datos ni iniciar sesión.`, heading:(f)=>`Trabaja con ${f} directamente en el navegador`, intro:(f,s)=>`Esta página se centra en ${f} y en flujos como ${s}. La herramienta real de JSNify está integrada aquí para que puedas completar la tarea sin pasar por una página intermedia.`, why:'Por qué es útil esta página', whyText:(f)=>`Cada flujo tiene problemas distintos. Aquí la explicación, los ejemplos y los enlaces relacionados se centran en ${f} en lugar de repetir una descripción genérica.`, use:'Caso de uso habitual', useText:(s)=>`Un caso común es trabajar con ${s}. Pega el contenido, procésalo localmente, revisa el resultado y copia o descarga la salida cuando esté disponible.`, privacy:'Procesamiento privado', privacyText:'El procesamiento principal ocurre en tu navegador. No necesitas subir el texto pegado a un servidor de procesamiento para estas herramientas.', how:'Cómo usarla', steps:['Pega el texto que quieres procesar.','Elige el modo adecuado.','Ejecuta la herramienta y revisa el resultado.','Copia o descarga la salida.'], faq:'Preguntas frecuentes', q1:(f)=>`¿Puedo usar esta página para ${f}?`, a1:(t)=>`Sí. Esta página integra el ${t} funcional en lugar de actuar como una página de paso.`, q2:'¿Necesito una cuenta?', a2:'No. Las herramientas actuales funcionan sin iniciar sesión.', q3:'¿Se envía mi contenido a una API de procesamiento?', a3:'Las operaciones compatibles se ejecutan en el cliente, dentro del navegador.', related:'Páginas relacionadas', openMain:'Abrir herramienta principal',
  },
  fr: {
    free:'Outil en ligne gratuit', title:(f,t)=>`${f} en ligne – ${t} gratuit`, description:(f,t)=>`Utilisez JSNify pour ${f} avec un ${t} gratuit exécuté localement dans votre navigateur, sans téléversement ni connexion.`, heading:(f)=>`Traiter ${f} directement dans le navigateur`, intro:(f,s)=>`Cette page est dédiée à ${f} et aux workflows comme ${s}. Le véritable outil JSNify est intégré à la page afin d'effectuer la tâche sans passer par une page intermédiaire.`, why:'Pourquoi cette page est utile', whyText:(f)=>`Les workflows ont des besoins différents. Cette page concentre les explications, exemples et liens connexes sur ${f} plutôt que de répéter une description générique.`, use:'Cas d’usage courant', useText:(s)=>`Un cas courant consiste à travailler avec ${s}. Collez le contenu, traitez-le localement, vérifiez le résultat puis copiez ou téléchargez la sortie disponible.`, privacy:'Traitement respectueux de la vie privée', privacyText:'Le traitement principal s’exécute dans votre navigateur. Aucun envoi du texte collé vers un serveur de traitement n’est nécessaire pour ces outils.', how:'Comment l’utiliser', steps:['Collez le texte à traiter.','Choisissez le mode adapté.','Exécutez l’outil et vérifiez le résultat.','Copiez ou téléchargez la sortie.'], faq:'Questions fréquentes', q1:(f)=>`Puis-je utiliser cette page pour ${f} ?`, a1:(t)=>`Oui. Cette page intègre le ${t} fonctionnel au lieu de servir de simple page de redirection.`, q2:'Faut-il un compte ?', a2:'Non. Les outils actuels fonctionnent sans connexion.', q3:'Mon contenu est-il envoyé à une API de traitement ?', a3:'Les opérations prises en charge s’exécutent côté client dans le navigateur.', related:'Pages associées', openMain:'Ouvrir l’outil principal',
  },
  de: {
    free:'Kostenloses Online-Tool', title:(f,t)=>`${f} online – kostenloser ${t}`, description:(f,t)=>`Nutze JSNify für ${f} mit einem kostenlosen ${t}, der lokal im Browser läuft – ohne Upload oder Anmeldung.`, heading:(f)=>`${f} direkt im Browser bearbeiten`, intro:(f,s)=>`Diese Seite konzentriert sich auf ${f} und Workflows wie ${s}. Das echte JSNify-Tool ist direkt eingebettet, sodass keine zwischengeschaltete Seite nötig ist.`, why:'Warum diese Seite nützlich ist', whyText:(f)=>`Unterschiedliche Workflows haben unterschiedliche Anforderungen. Erklärung, Beispiele und interne Links sind hier gezielt auf ${f} ausgerichtet statt nur eine allgemeine Tool-Beschreibung zu wiederholen.`, use:'Typischer Anwendungsfall', useText:(s)=>`Ein typischer Fall ist ${s}. Inhalt einfügen, lokal verarbeiten, Ergebnis prüfen und die Ausgabe bei Bedarf kopieren oder herunterladen.`, privacy:'Datenschutzorientierte Verarbeitung', privacyText:'Die Hauptverarbeitung findet in deinem Browser statt. Für diese Werkzeuge muss der eingefügte Text nicht an einen Verarbeitungsserver hochgeladen werden.', how:'So funktioniert es', steps:['Füge den zu verarbeitenden Text ein.','Wähle den passenden Modus.','Führe das Tool aus und prüfe das Ergebnis.','Kopiere oder lade die Ausgabe herunter.'], faq:'Häufige Fragen', q1:(f)=>`Kann ich diese Seite für ${f} verwenden?`, a1:(t)=>`Ja. Die Seite enthält den funktionierenden ${t} direkt und ist keine reine Weiterleitungsseite.`, q2:'Brauche ich ein Konto?', a2:'Nein. Die aktuellen Browser-Tools funktionieren ohne Anmeldung.', q3:'Werden meine Eingaben an eine Verarbeitungs-API gesendet?', a3:'Die unterstützten Vorgänge werden clientseitig im Browser ausgeführt.', related:'Verwandte Seiten', openMain:'Haupttool öffnen',
  },
};

export function getLandingCopy(locale: string, tool: SeoToolDefinition, intent: SeoIntent) {
  const lang = (locales.includes(locale as SiteLocale) ? locale : 'en') as SiteLocale;
  const c = copy[lang];
  return {
    lang,
    badge: c.free,
    title: c.title(intent.focus, tool.name),
    description: c.description(intent.focus, tool.name),
    heading: c.heading(intent.focus),
    intro: c.intro(intent.focus, intent.sampleLabel),
    sections: {
      whyTitle: c.why,
      whyText: c.whyText(intent.focus),
      useTitle: c.use,
      useText: c.useText(intent.sampleLabel),
      privacyTitle: c.privacy,
      privacyText: c.privacyText,
      howTitle: c.how,
      steps: c.steps,
      faqTitle: c.faq,
      faqs: [
        { q: c.q1(intent.focus), a: c.a1(tool.name) },
        { q: c.q2, a: c.a2 },
        { q: c.q3, a: c.a3 },
      ],
      relatedTitle: c.related,
      openMain: c.openMain,
    },
  };
}

export const programmaticSeoMode = process.env.PROGRAMMATIC_SEO_MODE === 'all' ? 'all' : 'pilot';

export function isSeoLandingIndexable(tool: SeoToolKey, slug: string) {
  if (programmaticSeoMode === 'all') return true;
  return toolDefinitions[tool].intents.slice(0, 6).some((intent) => intent.slug === slug);
}
