حدور تك — نسخة Cloudflare Workers + Static Assets
====================================================

هذه النسخة مخصصة للنشر على Cloudflare Workers باستخدام Static Assets.

المهم في هذه النسخة:
- الصفحة الرئيسية: /
- صفحات الشروحات: /article/bsod-windows ونحوها
- Worker يعيد article.html داخلياً لأي /article/*، ثم article.js يقرأ المعرّف من الرابط ويعرض المقال.
- لا يوجد Modal لفتح الشرح.

طريقة النشر:
1. ارفع محتويات هذا المجلد إلى مستودع GitHub المرتبط بـ Cloudflare.
2. استخدم أمر البناء/النشر: npx wrangler deploy
3. تأكد أن wrangler.toml موجود في جذر مجلد النشر وأن _worker.js موجود بجانب index.html.
4. بعد النشر اختبر:
   /
   /article/bsod-windows

إذا كان Cloudflare متصلًا بالمستودع، يكفي عمل Commit جديد وسيبدأ النشر حسب إعدادات المشروع.
