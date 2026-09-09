export interface SeoClusterPageDefinition {
  tool: string;
  slug: string;
  icon: string;
  keyword: {
    en: string;
    vi: string;
  };
  title: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  intro: {
    en: string;
    vi: string;
  };
  overview: {
    en: string[];
    vi: string[];
  };
  longForm: {
    en: string[];
    vi: string[];
  };
  whatIsIt: {
    en: string;
    vi: string;
  };
  howItWorks: {
    en: string;
    vi: string;
  };
  bestPractices: {
    en: string[];
    vi: string[];
  };
  benefits: {
    en: string[];
    vi: string[];
  };
  useCases: {
    en: string[];
    vi: string[];
  };
  steps: {
    en: string[];
    vi: string[];
  };
  faq: {
    q: { en: string; vi: string };
    a: { en: string; vi: string };
  }[];
  relatedTools: string[];
  example: {
    en: string;
    vi: string;
  };
}

interface ClusterContent {
  whatIsIt: { en: string; vi: string };
  howItWorks: { en: string; vi: string };
  bestPractices: { en: string[]; vi: string[] };
  faq: {
    q: { en: string; vi: string };
    a: { en: string; vi: string };
  }[];
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const buildEntry = (
  tool: string,
  keyword: { en: string; vi: string },
  relatedTools: string[],
  content: ClusterContent,
): SeoClusterPageDefinition => {
  const toolLabel = {
    'sql-formatter': { en: 'SQL Formatter', vi: 'Định dạng SQL' },
    'json-validator': { en: 'JSON Validator', vi: 'Kiểm tra JSON' },
    'csv-to-json': { en: 'CSV to JSON Converter', vi: 'Chuyển CSV sang JSON' },
    'css-minify': { en: 'CSS Minifier', vi: 'Nén CSS' },
    'hash-generator': { en: 'Hash Generator', vi: 'Tạo Hash' },
    'url-encoder-decoder': { en: 'URL Encoder Decoder', vi: 'Mã hóa URL' },
  }[tool] || { en: 'Tool', vi: 'Công cụ' };

  const titleEn = `${keyword.en.replace(/\bonline\b/gi, '').trim()} | ${toolLabel.en} | JSNify`;
  const titleVi = `${keyword.vi} | ${toolLabel.vi} | JSNify`;
  const descriptionEn = (() => {
    switch (tool) {
      case 'sql-formatter':
        return `Use this free SQL formatter to clean, indent, and beautify SQL queries online in your browser.`;
      case 'json-validator':
        return `Use this JSON validator to check syntax, structure, and formatting for APIs and web apps.`;
      case 'csv-to-json':
        return `Use this CSV to JSON converter to transform spreadsheet data into structured JSON instantly.`;
      case 'css-minify':
        return `Use this CSS minifier to compress and optimize stylesheets for faster websites.`;
      case 'hash-generator':
        return `Use this hash generator to create MD5, SHA-1, SHA-256, and other hashes online.`;
      case 'url-encoder-decoder':
        return `Use this URL encoder decoder to safely encode or decode URLs and query strings online.`;
      default:
        return `Use ${keyword.en} to clean, validate, and optimize data instantly in your browser.`;
    }
  })();
  const descriptionVi = (() => {
    switch (tool) {
      case 'sql-formatter':
        return `Dùng công cụ định dạng SQL miễn phí này để làm đẹp, thụt lề và chuẩn hóa truy vấn SQL trực tuyến.`;
      case 'json-validator':
        return `Dùng công cụ kiểm tra JSON này để kiểm tra cú pháp, cấu trúc và định dạng cho API và ứng dụng web.`;
      case 'csv-to-json':
        return `Dùng công cụ chuyển CSV sang JSON này để biến dữ liệu bảng tính thành JSON có cấu trúc tức thì.`;
      case 'css-minify':
        return `Dùng công cụ nén CSS này để nén và tối ưu stylesheet cho website nhanh hơn.`;
      case 'hash-generator':
        return `Dùng công cụ tạo hash này để tạo MD5, SHA-1, SHA-256 và các hash khác trực tuyến.`;
      case 'url-encoder-decoder':
        return `Dùng công cụ mã hóa và giải mã URL này để mã hóa hoặc giải mã URL và query string an toàn.`;
      default:
        return `Dùng ${keyword.vi} để làm sạch, kiểm tra và tối ưu dữ liệu tức thì trong trình duyệt.`;
    }
  })();
  const introEn = `${toolLabel.en} helps you solve a specific workflow quickly with a focused, search-friendly experience.`;
  const introVi = `${toolLabel.vi} giúp bạn giải quyết một tác vụ cụ thể nhanh chóng bằng trải nghiệm tối ưu cho tìm kiếm.`;
  const overviewEn = [
    `This ${toolLabel.en.toLowerCase()} page is designed for people searching for ${keyword.en} and wanting a fast answer without installing extra software.`,
    `The workflow stays simple: paste your content, process it in the browser, and copy the polished output for development, testing, reporting, or publishing.`,
    `Because the tool is lightweight and instant, it is especially useful for repeated daily tasks, quick debugging sessions, and content cleanup jobs.`,
  ];
  const overviewVi = [
    `Trang ${toolLabel.vi.toLowerCase()} này được thiết kế cho người tìm kiếm ${keyword.vi} và muốn có kết quả nhanh mà không cần cài thêm phần mềm.`,
    `Quy trình vẫn rất đơn giản: dán nội dung, xử lý trực tiếp trong trình duyệt và sao chép kết quả đã được làm đẹp cho phát triển, kiểm thử, báo cáo hoặc đăng tải.`,
    `Vì công cụ nhẹ và phản hồi tức thì, nó rất phù hợp cho các tác vụ lặp lại hàng ngày, xử lý lỗi nhanh và chuẩn hóa nội dung.`,
  ];

  return {
    tool,
    slug: slugify(keyword.en),
    icon: {
      'sql-formatter': '🗄️',
      'json-validator': '🧩',
      'csv-to-json': '📊',
      'css-minify': '🎨',
      'hash-generator': '🔐',
      'url-encoder-decoder': '🔗',
    }[tool] || '🛠️',
    keyword,
    title: { en: titleEn, vi: titleVi },
    description: { en: descriptionEn, vi: descriptionVi },
    intro: { en: introEn, vi: introVi },
    overview: { en: overviewEn, vi: overviewVi },
    longForm: {
      en: [
        `If you are looking for ${keyword.en}, this page gives you a practical guide that goes beyond a single tool action. You can understand the problem, see why the workflow matters, and apply the result in real projects.`,
        `Searchers often need more than a quick transform. They want confidence that the process is safe, repeatable, and useful for their daily work. That is why the content here focuses on intent, scenarios, and outcomes rather than just a simple button.`,
        `For teams working with data, content, APIs, or front-end performance, this page acts as a compact reference point that can help users decide quickly whether the tool fits their requirements.`,
      ],
      vi: [
        `Nếu bạn đang tìm ${keyword.vi}, trang này cung cấp một hướng dẫn thực tế vượt xa một thao tác đơn lẻ. Bạn có thể hiểu vấn đề, thấy vì sao quy trình này quan trọng và áp dụng kết quả vào các dự án thật.`,
        `Người tìm kiếm thường cần nhiều hơn một thao tác nhanh. Họ muốn tự tin rằng quy trình an toàn, có thể lặp lại và hữu ích cho công việc hàng ngày. Vì vậy, nội dung ở đây tập trung vào ý định, tình huống và kết quả thay vì chỉ là một nút bấm đơn giản.`,
        `Đối với các nhóm làm việc với dữ liệu, nội dung, API hoặc hiệu năng frontend, trang này là một điểm tham chiếu ngắn gọn để giúp người dùng quyết định nhanh xem công cụ có phù hợp với nhu cầu của họ hay không.`,
      ],
    },
    whatIsIt: content.whatIsIt,
    howItWorks: content.howItWorks,
    bestPractices: content.bestPractices,
    benefits: {
      en: [
        'Fast browser-based workflow that avoids setup and installation',
        'Clear output for copy, reuse, and documentation',
        'No signup required, so you can start immediately',
        'Reliable for repetitive development, QA, and content tasks',
      ],
      vi: [
        'Quy trình nhanh trong trình duyệt, tránh cài đặt và thiết lập phức tạp',
        'Kết quả rõ ràng để sao chép, tái sử dụng và ghi tài liệu',
        'Không cần đăng nhập nên bạn có thể bắt đầu ngay',
        'Đáng tin cậy cho các tác vụ phát triển, kiểm thử và xử lý nội dung lặp đi lặp lại',
      ],
    },
    useCases: {
      en: [
        'Developer workflow for formatting and validation',
        'QA and debugging when you need to inspect content quickly',
        'SEO and content operations for preparing clean snippets',
        'API and data tasks that require readable output',
      ],
      vi: [
        'Quy trình phát triển để định dạng và kiểm tra dữ liệu',
        'Kiểm thử và debug khi cần xem nội dung nhanh',
        'SEO và vận hành nội dung để chuẩn bị đoạn mã sạch',
        'Các tác vụ API và dữ liệu cần đầu ra dễ đọc',
      ],
    },
    steps: {
      en: [
        'Paste your input into the editor or field',
        'Choose the transformation or validation mode you need',
        'Run the tool and review the result carefully',
        'Copy the polished output into your project or document',
      ],
      vi: [
        'Dán dữ liệu đầu vào vào vùng nhập liệu',
        'Chọn chế độ xử lý hoặc kiểm tra phù hợp',
        'Chạy công cụ và xem kết quả kỹ lưỡng',
        'Sao chép đầu ra đã được làm sạch vào dự án hoặc tài liệu của bạn',
      ],
    },
    faq: content.faq,
    relatedTools,
    example: {
      en: `Example for ${keyword.en}`,
      vi: `Ví dụ cho ${keyword.vi}`,
    },
  };
};

const sqlContent: ClusterContent = {
  whatIsIt: {
    en: 'A SQL formatter makes long and messy database queries easier to read, review, and maintain. It is especially useful when you want to share SQL with teammates or debug a report quickly.',
    vi: 'Công cụ định dạng SQL giúp các truy vấn cơ sở dữ liệu dài và lộn xộn dễ đọc hơn, dễ xem lại và bảo trì. Nó rất hữu ích khi bạn muốn chia sẻ SQL với đồng nghiệp hoặc debug báo cáo nhanh.',
  },
  howItWorks: {
    en: 'Paste your query, choose the formatting style, and let the tool restructure indentation, line breaks, and keyword casing so the SQL becomes easier to scan and compare.',
    vi: 'Dán truy vấn của bạn, chọn kiểu định dạng, rồi để công cụ tự sắp xếp thụt lề, ngắt dòng và kiểu chữ khóa để SQL dễ đọc và so sánh hơn.',
  },
  bestPractices: {
    en: ['Format SQL before sharing it with teammates', 'Keep queries readable for debugging and auditing', 'Use formatting consistently in reports and documentation'],
    vi: ['Định dạng SQL trước khi chia sẻ với đồng nghiệp', 'Giữ truy vấn dễ đọc để debug và kiểm toán', 'Dùng định dạng thống nhất trong báo cáo và tài liệu'],
  },
  faq: [
    {
      q: { en: 'Is this SQL formatter suitable for large queries?', vi: 'Công cụ định dạng SQL này có phù hợp với truy vấn lớn không?' },
      a: { en: 'Yes. It helps keep long SQL statements readable and easier to troubleshoot during development or reporting.', vi: 'Có. Nó giúp các câu lệnh SQL dài dễ đọc hơn và dễ khắc phục sự cố khi phát triển hoặc báo cáo.' },
    },
    {
      q: { en: 'Can I use it for PostgreSQL and MySQL?', vi: 'Có thể dùng cho PostgreSQL và MySQL không?' },
      a: { en: 'Yes. The formatter works well for standard SQL syntax used across many database engines.', vi: 'Có. Công cụ này hoạt động tốt với cú pháp SQL chuẩn được dùng trên nhiều hệ quản trị cơ sở dữ liệu.' },
    },
    {
      q: { en: 'Does it help with documentation?', vi: 'Nó có giúp việc viết tài liệu không?' },
      a: { en: 'Absolutely. Clean formatting makes SQL easier to share in docs, tickets, and internal guides.', vi: 'Chắc chắn rồi. Định dạng sạch giúp SQL dễ chia sẻ trong tài liệu, ticket và hướng dẫn nội bộ.' },
    },
  ],
};

const sqlKeywords = [
  { en: 'free online sql formatter', vi: 'công cụ định dạng sql trực tuyến miễn phí' },
  { en: 'format sql query online', vi: 'định dạng truy vấn sql trực tuyến' },
  { en: 'beautify sql query', vi: 'làm đẹp truy vấn sql' },
  { en: 'sql formatter for developers', vi: 'công cụ định dạng sql cho developer' },
  { en: 'clean sql script online', vi: 'làm sạch script sql trực tuyến' },
  { en: 'sql minifier online', vi: 'nén sql trực tuyến' },
  { en: 'minify sql query', vi: 'nén truy vấn sql' },
  { en: 'postgresql sql formatter', vi: 'định dạng sql cho postgresql' },
  { en: 'mysql sql formatter', vi: 'định dạng sql cho mysql' },
  { en: 'sql query formatter', vi: 'định dạng câu lệnh sql' },
  { en: 'sql code beautifier', vi: 'làm đẹp mã sql' },
  { en: 'format sql for reporting', vi: 'định dạng sql cho báo cáo' },
  { en: 'sql formatter for dbas', vi: 'công cụ định dạng sql cho dba' },
  { en: 'online sql pretty printer', vi: 'trình in đẹp sql trực tuyến' },
  { en: 'sql formatter tool', vi: 'công cụ định dạng sql' },
  { en: 'format sql statements online', vi: 'định dạng câu lệnh sql trực tuyến' },
  { en: 'sql beautifier free', vi: 'làm đẹp sql miễn phí' },
  { en: 'sql cleanup tool', vi: 'công cụ làm sạch sql' },
  { en: 'sql formatting tool', vi: 'công cụ định dạng sql' },
  { en: 'format sql for documentation', vi: 'định dạng sql cho tài liệu' },
];

const jsonContent: ClusterContent = {
  whatIsIt: {
    en: 'A JSON validator checks whether your payload is valid, structured correctly, and ready to send to an API or app. It helps catch syntax errors before they break integrations.',
    vi: 'Công cụ kiểm tra JSON kiểm tra xem payload của bạn có hợp lệ, có cấu trúc đúng và có sẵn để gửi tới API hoặc ứng dụng hay không. Nó giúp phát hiện lỗi cú pháp trước khi làm hỏng tích hợp.',
  },
  howItWorks: {
    en: 'Paste your JSON payload, run validation, and inspect any error messages. The tool highlights invalid syntax, missing commas, or mismatched brackets so you can fix the issue quickly.',
    vi: 'Dán payload JSON của bạn, chạy kiểm tra và xem các thông báo lỗi. Công cụ sẽ làm nổi bật cú pháp sai, thiếu dấu phẩy hoặc dấu ngoặc không khớp để bạn sửa nhanh.',
  },
  bestPractices: {
    en: ['Validate API responses before using them in production', 'Format JSON for easier debugging and review', 'Check payload structure when building integrations'],
    vi: ['Kiểm tra response API trước khi dùng trong production', 'Định dạng JSON để debug và xem lại dễ hơn', 'Kiểm tra cấu trúc payload khi xây dựng tích hợp'],
  },
  faq: [
    {
      q: { en: 'How do I know if my JSON is valid?', vi: 'Làm sao để biết JSON của tôi có hợp lệ không?' },
      a: { en: 'The validator will report syntax issues such as missing commas, unmatched brackets, or invalid string formatting.', vi: 'Công cụ kiểm tra sẽ báo lỗi cú pháp như thiếu dấu phẩy, ngoặc không khớp hoặc định dạng chuỗi không hợp lệ.' },
    },
    {
      q: { en: 'Can I use it for API debugging?', vi: 'Có thể dùng cho debug API không?' },
      a: { en: 'Yes. It is especially useful for checking API responses before passing them to frontend code or tests.', vi: 'Có. Nó rất hữu ích để kiểm tra response API trước khi đưa vào mã frontend hoặc bài kiểm thử.' },
    },
    {
      q: { en: 'Does it help with formatting too?', vi: 'Nó có giúp định dạng nữa không?' },
      a: { en: 'Yes. Many teams use it to make JSON easier to read and compare during development.', vi: 'Có. Nhiều đội dùng nó để làm cho JSON dễ đọc và dễ so sánh hơn trong quá trình phát triển.' },
    },
  ],
};

const jsonKeywords = [
  { en: 'json validator online', vi: 'công cụ kiểm tra json trực tuyến' },
  { en: 'validate json syntax', vi: 'kiểm tra cú pháp json' },
  { en: 'json formatter online', vi: 'định dạng json trực tuyến' },
  { en: 'beautify json online', vi: 'làm đẹp json trực tuyến' },
  { en: 'json parser online', vi: 'trình phân tích json trực tuyến' },
  { en: 'check json structure', vi: 'kiểm tra cấu trúc json' },
  { en: 'format json payload', vi: 'định dạng payload json' },
  { en: 'json error checker', vi: 'kiểm tra lỗi json' },
  { en: 'validate api response json', vi: 'kiểm tra response api json' },
  { en: 'pretty print json', vi: 'định dạng json đẹp' },
  { en: 'json validator free', vi: 'kiểm tra json miễn phí' },
  { en: 'json checker online', vi: 'kiểm tra json trực tuyến' },
  { en: 'json linter online', vi: 'linter json trực tuyến' },
  { en: 'json syntax checker', vi: 'kiểm tra cú pháp json' },
  { en: 'online json formatter tool', vi: 'công cụ định dạng json trực tuyến' },
  { en: 'validate json file', vi: 'kiểm tra file json' },
  { en: 'json viewer online', vi: 'trình xem json trực tuyến' },
  { en: 'json structure validator', vi: 'kiểm tra cấu trúc json' },
  { en: 'fix invalid json', vi: 'sửa json không hợp lệ' },
  { en: 'json formatter for api', vi: 'định dạng json cho api' },
];

const csvContent: ClusterContent = {
  whatIsIt: {
    en: 'A CSV to JSON converter turns tabular data into structured JSON objects that are easier to use in apps, APIs, and modern web services.',
    vi: 'Công cụ chuyển CSV sang JSON biến dữ liệu dạng bảng thành các đối tượng JSON có cấu trúc, dễ sử dụng trong ứng dụng, API và dịch vụ web hiện đại.',
  },
  howItWorks: {
    en: 'Upload or paste the CSV data and the tool maps each row and column into JSON fields. This is useful when you need to move spreadsheet data into a developer workflow or service endpoint.',
    vi: 'Tải lên hoặc dán dữ liệu CSV và công cụ sẽ ánh xạ từng hàng và cột thành các trường JSON. Điều này hữu ích khi bạn cần chuyển dữ liệu bảng tính vào quy trình phát triển hoặc endpoint dịch vụ.',
  },
  bestPractices: {
    en: ['Prepare clean headers before converting data', 'Validate the output structure for downstream apps', 'Use it for imports, reports, and API payloads'],
    vi: ['Chuẩn bị tiêu đề sạch trước khi chuyển dữ liệu', 'Kiểm tra cấu trúc đầu ra cho ứng dụng phía sau', 'Dùng cho nhập liệu, báo cáo và payload API'],
  },
  faq: [
    {
      q: { en: 'What is the output format of the converter?', vi: 'Đầu ra của công cụ này có định dạng gì?' },
      a: { en: 'It converts CSV rows into JSON objects or arrays, depending on the structure and your needs.', vi: 'Nó chuyển các dòng CSV thành các object hoặc array JSON, tùy thuộc vào cấu trúc và nhu cầu của bạn.' },
    },
    {
      q: { en: 'Can I use it for spreadsheet imports?', vi: 'Có thể dùng cho nhập dữ liệu từ bảng tính không?' },
      a: { en: 'Yes. It is commonly used to prepare spreadsheet exports for APIs, apps, and dashboards.', vi: 'Có. Nó thường được dùng để chuẩn bị dữ liệu xuất từ bảng tính cho API, ứng dụng và dashboard.' },
    },
    {
      q: { en: 'Does it preserve my column names?', vi: 'Có giữ tên cột không?' },
      a: { en: 'Yes. The converter uses headers from your CSV file to create readable JSON properties.', vi: 'Có. Công cụ dùng tiêu đề từ file CSV để tạo các thuộc tính JSON dễ đọc.' },
    },
  ],
};

const csvKeywords = [
  { en: 'csv to json converter', vi: 'công cụ chuyển csv sang json' },
  { en: 'convert csv to json online', vi: 'chuyển csv sang json trực tuyến' },
  { en: 'csv to json online free', vi: 'chuyển csv sang json miễn phí' },
  { en: 'excel to json converter', vi: 'chuyển excel sang json' },
  { en: 'table data to json', vi: 'chuyển dữ liệu bảng sang json' },
  { en: 'convert csv rows to json', vi: 'chuyển hàng csv sang json' },
  { en: 'csv parser to json', vi: 'trình phân tích csv sang json' },
  { en: 'spreadsheet to json tool', vi: 'công cụ chuyển bảng tính sang json' },
  { en: 'csv to object converter', vi: 'chuyển csv sang đối tượng' },
  { en: 'transform csv to json', vi: 'biến đổi csv sang json' },
  { en: 'csv to api payload', vi: 'csv sang payload api' },
  { en: 'convert tabular data to json', vi: 'chuyển dữ liệu dạng bảng sang json' },
  { en: 'csv import to json', vi: 'nhập csv sang json' },
  { en: 'csv data to json', vi: 'dữ liệu csv sang json' },
  { en: 'online csv converter', vi: 'công cụ chuyển csv trực tuyến' },
  { en: 'csv to json for developers', vi: 'csv sang json cho developer' },
  { en: 'csv to json formatter', vi: 'định dạng csv sang json' },
  { en: 'convert comma separated values to json', vi: 'chuyển csv sang json' },
  { en: 'csv to json mapping tool', vi: 'công cụ ánh xạ csv sang json' },
  { en: 'csv to json for apis', vi: 'csv sang json cho api' },
];

const cssContent: ClusterContent = {
  whatIsIt: {
    en: 'A CSS minifier removes whitespace, comments, and redundant formatting from stylesheets so the file becomes smaller and faster to download.',
    vi: 'Công cụ nén CSS loại bỏ khoảng trắng, comment và định dạng dư thừa khỏi file stylesheet để file nhỏ hơn và tải nhanh hơn.',
  },
  howItWorks: {
    en: 'Paste your CSS and the tool compresses the code while keeping the final behavior intact. This helps teams reduce page size and improve performance without changing the design.',
    vi: 'Dán CSS của bạn và công cụ sẽ nén mã trong khi vẫn giữ nguyên hành vi cuối cùng. Điều này giúp giảm kích thước trang và cải thiện hiệu năng mà không làm đổi thiết kế.',
  },
  bestPractices: {
    en: ['Minify production CSS before deployment', 'Keep a readable backup copy for debugging', 'Combine minification with caching for better performance'],
    vi: ['Nén CSS production trước khi triển khai', 'Giữ bản sao dễ đọc để debug', 'Kết hợp nén với caching để hiệu năng tốt hơn'],
  },
  faq: [
    {
      q: { en: 'Will minifying CSS change the design?', vi: 'Việc nén CSS có làm thay đổi thiết kế không?' },
      a: { en: 'No. Minification removes whitespace and formatting, but it does not change the actual styling logic.', vi: 'Không. Nén CSS chỉ bỏ khoảng trắng và định dạng, chứ không thay đổi logic tạo kiểu.' },
    },
    {
      q: { en: 'Is it good for production websites?', vi: 'Có phù hợp cho website production không?' },
      a: { en: 'Yes. It is commonly used to reduce file size and improve loading performance.', vi: 'Có. Nó thường được dùng để giảm kích thước file và cải thiện hiệu năng tải trang.' },
    },
    {
      q: { en: 'Can I use it for large stylesheets?', vi: 'Có thể dùng cho stylesheet lớn không?' },
      a: { en: 'Yes. It works well for large projects where every byte of CSS matters.', vi: 'Có. Nó hoạt động tốt cho dự án lớn khi mỗi byte CSS đều quan trọng.' },
    },
  ],
};

const cssKeywords = [
  { en: 'css minifier online', vi: 'công cụ nén css trực tuyến' },
  { en: 'minify css online', vi: 'nén css trực tuyến' },
  { en: 'compress css online', vi: 'nén css trực tuyến' },
  { en: 'optimize css file', vi: 'tối ưu file css' },
  { en: 'css compressor free', vi: 'máy nén css miễn phí' },
  { en: 'reduce css file size', vi: 'giảm kích thước file css' },
  { en: 'css minify tool', vi: 'công cụ nén css' },
  { en: 'minify stylesheet online', vi: 'nén stylesheet trực tuyến' },
  { en: 'compress stylesheet', vi: 'nén stylesheet' },
  { en: 'css formatter minifier', vi: 'định dạng và nén css' },
  { en: 'clean css online', vi: 'làm sạch css trực tuyến' },
  { en: 'css optimizer online', vi: 'tối ưu css trực tuyến' },
  { en: 'css minifier for production', vi: 'nén css cho production' },
  { en: 'remove whitespace from css', vi: 'xóa khoảng trắng khỏi css' },
  { en: 'minify css for performance', vi: 'nén css cho hiệu năng' },
  { en: 'css shrink tool', vi: 'công cụ thu nhỏ css' },
  { en: 'optimize css code', vi: 'tối ưu mã css' },
  { en: 'online css compressor', vi: 'máy nén css trực tuyến' },
  { en: 'css minifier for website', vi: 'nén css cho website' },
  { en: 'style sheet minifier', vi: 'công cụ nén stylesheet' },
];

const hashContent: ClusterContent = {
  whatIsIt: {
    en: 'A hash generator creates fixed-length digital fingerprints from text, files, or strings. These values are commonly used for verification, security checks, and content integrity.',
    vi: 'Công cụ tạo hash tạo ra dấu vân tay số có độ dài cố định từ văn bản, file hoặc chuỗi. Các giá trị này thường được dùng cho xác minh, kiểm tra bảo mật và tính toàn vẹn dữ liệu.',
  },
  howItWorks: {
    en: 'Enter the text or content you want to hash, choose the algorithm such as MD5 or SHA-256, and generate the output instantly. The result can be used for checksums, password storage, or validation workflows.',
    vi: 'Nhập văn bản hoặc nội dung bạn muốn hash, chọn thuật toán như MD5 hoặc SHA-256, rồi tạo đầu ra tức thì. Kết quả có thể dùng cho checksum, lưu mật khẩu hoặc quy trình xác thực.',
  },
  bestPractices: {
    en: ['Use strong algorithms like SHA-256 for sensitive data', 'Store hashes instead of plain secrets when possible', 'Compare hash outputs when validating file integrity'],
    vi: ['Dùng thuật toán mạnh như SHA-256 cho dữ liệu nhạy cảm', 'Lưu hash thay vì lưu dữ liệu gốc khi có thể', 'So sánh kết quả hash khi xác minh tính toàn vẹn file'],
  },
  faq: [
    {
      q: { en: 'Which hash algorithm should I choose?', vi: 'Nên chọn thuật toán hash nào?' },
      a: { en: 'Use SHA-256 for general security needs and MD5 only for quick checks where speed matters more than security.', vi: 'Dùng SHA-256 cho nhu cầu bảo mật chung và MD5 chỉ cho các kiểm tra nhanh khi tốc độ quan trọng hơn bảo mật.' },
    },
    {
      q: { en: 'Can I generate hashes for text and passwords?', vi: 'Có thể tạo hash cho văn bản và mật khẩu không?' },
      a: { en: 'Yes. The generator is useful for text verification and preparing non-reversible fingerprints.', vi: 'Có. Công cụ này hữu ích cho xác minh văn bản và tạo dấu vân tay không thể đảo ngược.' },
    },
    {
      q: { en: 'Is it safe to share the result?', vi: 'Có an toàn khi chia sẻ kết quả không?' },
      a: { en: 'Yes. Hash values are usually safe to share because they do not expose the original plaintext directly.', vi: 'Có. Giá trị hash thường an toàn để chia sẻ vì không lộ trực tiếp nội dung gốc.' },
    },
  ],
};

const hashKeywords = [
  { en: 'hash generator online', vi: 'công cụ tạo hash trực tuyến' },
  { en: 'md5 generator online', vi: 'công cụ tạo md5 trực tuyến' },
  { en: 'sha256 generator online', vi: 'công cụ tạo sha256 trực tuyến' },
  { en: 'sha1 hash generator', vi: 'công cụ tạo hash sha1' },
  { en: 'generate checksum online', vi: 'tạo checksum trực tuyến' },
  { en: 'hash calculator online', vi: 'máy tính hash trực tuyến' },
  { en: 'create hash for text', vi: 'tạo hash cho văn bản' },
  { en: 'free hash tool', vi: 'công cụ hash miễn phí' },
  { en: 'generate md5 hash', vi: 'tạo md5 hash' },
  { en: 'generate sha256 hash', vi: 'tạo sha256 hash' },
  { en: 'hash generator for developers', vi: 'công cụ tạo hash cho developer' },
  { en: 'online sha512 generator', vi: 'công cụ tạo sha512 trực tuyến' },
  { en: 'create message digest', vi: 'tạo message digest' },
  { en: 'hash verification tool', vi: 'công cụ xác minh hash' },
  { en: 'checksum generator free', vi: 'máy tạo checksum miễn phí' },
  { en: 'hash string online', vi: 'hash chuỗi trực tuyến' },
  { en: 'generate hash for api', vi: 'tạo hash cho api' },
  { en: 'secure hash generator', vi: 'công cụ tạo hash bảo mật' },
  { en: 'hash tool for debugging', vi: 'công cụ hash cho debug' },
  { en: 'generate hash value online', vi: 'tạo giá trị hash trực tuyến' },
];

const urlContent: ClusterContent = {
  whatIsIt: {
    en: 'An URL encoder and decoder converts special characters into safe web-safe forms and reverses the process when needed. This is essential for links, query strings, and API requests.',
    vi: 'Công cụ mã hóa và giải mã URL chuyển ký tự đặc biệt thành dạng an toàn cho web và đảo ngược quá trình khi cần. Điều này rất quan trọng cho liên kết, query string và request API.',
  },
  howItWorks: {
    en: 'Paste a URL or query string, choose whether to encode or decode it, and the tool returns a browser-safe result. It helps avoid broken links and ensures special characters are interpreted correctly.',
    vi: 'Dán URL hoặc query string, chọn mã hóa hay giải mã, và công cụ sẽ trả về kết quả an toàn cho trình duyệt. Nó giúp tránh liên kết bị hỏng và đảm bảo ký tự đặc biệt được hiểu đúng.',
  },
  bestPractices: {
    en: ['Encode parameters before sending them to APIs', 'Decode URLs before reading values from query strings', 'Use it when building links with spaces or symbols'],
    vi: ['Mã hóa tham số trước khi gửi tới API', 'Giải mã URL trước khi đọc giá trị từ query string', 'Dùng khi xây dựng liên kết có khoảng trắng hoặc ký hiệu'],
  },
  faq: [
    {
      q: { en: 'What is the difference between encoding and decoding?', vi: 'Sự khác biệt giữa mã hóa và giải mã là gì?' },
      a: { en: 'Encoding transforms unsafe characters into a browser-safe format, while decoding reverses the process for readable values.', vi: 'Mã hóa chuyển ký tự không an toàn thành định dạng an toàn cho trình duyệt, còn giải mã đảo ngược quá trình để đọc giá trị rõ ràng.' },
    },
    {
      q: { en: 'Can I use it for query strings?', vi: 'Có thể dùng cho query string không?' },
      a: { en: 'Yes. It is especially useful for encoding parameters that include spaces, symbols, or non-ASCII characters.', vi: 'Có. Nó đặc biệt hữu ích khi mã hóa tham số có khoảng trắng, ký hiệu hoặc ký tự không phải ASCII.' },
    },
    {
      q: { en: 'Is it useful for API integration?', vi: 'Có hữu ích cho tích hợp API không?' },
      a: { en: 'Yes. API developers often use it to make URLs and payload parameters safe and predictable.', vi: 'Có. Nhà phát triển API thường dùng nó để làm cho URL và tham số payload an toàn và dễ dự đoán.' },
    },
  ],
};

const urlKeywords = [
  { en: 'url encoder decoder', vi: 'công cụ mã hóa giải mã url' },
  { en: 'encode url online', vi: 'mã hóa url trực tuyến' },
  { en: 'decode url online', vi: 'giải mã url trực tuyến' },
  { en: 'percent encode url', vi: 'mã hóa phần trăm cho url' },
  { en: 'url parser online', vi: 'trình phân tích url trực tuyến' },
  { en: 'query string encoder', vi: 'mã hóa query string' },
  { en: 'url escape tool', vi: 'công cụ thoát url' },
  { en: 'decode query parameter', vi: 'giải mã tham số truy vấn' },
  { en: 'encode special characters', vi: 'mã hóa ký tự đặc biệt' },
  { en: 'url safe encoding', vi: 'mã hóa an toàn cho url' },
  { en: 'url encode for api', vi: 'mã hóa url cho api' },
  { en: 'decode uri online', vi: 'giải mã uri trực tuyến' },
  { en: 'uri encoder decoder', vi: 'mã hóa giải mã uri' },
  { en: 'url percent encoding tool', vi: 'công cụ mã hóa phần trăm url' },
  { en: 'encode search query', vi: 'mã hóa truy vấn tìm kiếm' },
  { en: 'decode web address', vi: 'giải mã địa chỉ web' },
  { en: 'browser safe url tool', vi: 'công cụ url an toàn cho trình duyệt' },
  { en: 'encode href value', vi: 'mã hóa giá trị href' },
  { en: 'url decoding tool', vi: 'công cụ giải mã url' },
  { en: 'free url encoder', vi: 'mã hóa url miễn phí' },
];

export const seoClusterPages: SeoClusterPageDefinition[] = [
  ...sqlKeywords.map((keyword) => buildEntry('sql-formatter', keyword, ['json-validator', 'csv-to-json', 'tools'], sqlContent)),
  ...jsonKeywords.map((keyword) => buildEntry('json-validator', keyword, ['csv-to-json', 'sql-formatter', 'tools'], jsonContent)),
  ...csvKeywords.map((keyword) => buildEntry('csv-to-json', keyword, ['json-validator', 'sql-formatter', 'tools'], csvContent)),
  ...cssKeywords.map((keyword) => buildEntry('css-minify', keyword, ['url-encoder-decoder', 'tools'], cssContent)),
  ...hashKeywords.map((keyword) => buildEntry('hash-generator', keyword, ['url-encoder-decoder', 'tools'], hashContent)),
  ...urlKeywords.map((keyword) => buildEntry('url-encoder-decoder', keyword, ['css-minify', 'hash-generator', 'tools'], urlContent)),
];

export const getSeoClusterPage = (slug: string, tool?: string) =>
  seoClusterPages.find((page) => page.slug === slug && (!tool || page.tool === tool));
