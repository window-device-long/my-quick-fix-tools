import { getDictionary } from '@/dictionaries/get-dictionary';
import SqlClientTool from '@/app/[lang]/sql-formatter/SqlClientTool';
import JsonValidatorClient from '@/app/[lang]/json-validator/JsonValidatorClient';
import CsvToJsonClient from '@/app/[lang]/csv-to-json/CsvToJsonClient';
import CssMinifyClient from '@/app/[lang]/css-minify/CssMinifyClient';
import HashGeneratorClient from '@/app/[lang]/hash-generator/HashGeneratorClient';
import UrlEncoderDecoderClient from '@/app/[lang]/url-encoder-decoder/UrlEncoderDecoderClient';
import type { SeoToolKey } from '@/lib/seo-landings';

export default async function SeoEmbeddedTool({ lang, tool }: { lang: string; tool: SeoToolKey }) {
  const dict = await getDictionary(lang);

  if (tool === 'sql-formatter') return <SqlClientTool lang={lang} dict={dict.sql} />;
  if (tool === 'json-validator') return <JsonValidatorClient lang={lang} dict={dict['json_validator']} />;
  if (tool === 'csv-to-json') return <CsvToJsonClient lang={lang} dict={dict['csv_to_json']} />;
  if (tool === 'css-minify') return <CssMinifyClient lang={lang} dict={dict['css_minify']} />;
  if (tool === 'hash-generator') return <HashGeneratorClient lang={lang} dict={dict['hash_generator']} />;
  return <UrlEncoderDecoderClient lang={lang} dict={dict['url_encoder_decoder']} />;
}
