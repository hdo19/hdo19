حدور تك — نسخة Firebase + لوحة إدارة + نموذج مراسلة بالبريد
===========================================================

الملفات
-------
index.html                  واجهة الزوار
admin.html                  لوحة إدارة منفصلة (لا يوجد زر إدارة في الصفحة العامة)
style.css                   التصميم
script.js                   عرض المقالات والتعليقات والإعجابات
admin.js                    إدارة المقالات والتعليقات والحظر
firebase-config.js          إعدادات Firebase وEmailJS
firestore.rules             قواعد حماية قاعدة البيانات
starter-tutorials.json      أربعة مقالات أولية للاستيراد

أولاً: إعداد Firebase
--------------------
1) افتح https://console.firebase.google.com وأنشئ مشروعاً باسم Hadoor Tech.
2) أضف Web App من Project settings > General > Your apps، وانسخ إعدادات firebaseConfig إلى firebase-config.js.
   لا تضع Service Account أو أي مفتاح خاص في ملفات الموقع.
3) Authentication > Sign-in method: فعّل Anonymous للزوار، وGoogle للمشرف.
4) Authentication > Settings > Authorized domains: أضف نطاق موقعك المنشور على Cloudflare Pages ونطاقك الخاص إن وجد.
5) Firestore Database > Create database.
6) افتح Firestore > Rules والصق محتوى firestore.rules ثم Publish.
7) ارفع الملفات كلها إلى Cloudflare Pages مع الحفاظ على الملفات في المجلد نفسه.

ثانياً: منح حسابك صلاحية المشرف
-------------------------------
1) افتح الموقع ثم /admin.html وسجّل الدخول بحساب Google الذي تريد أن يكون حساب المشرف.
2) في Firebase Console افتح Authentication > Users وانسخ UID للحساب الذي سجلت به.
3) افتح Firestore Data وأنشئ Collection باسم admins.
4) أنشئ Document ID يساوي UID نفسه (ليس البريد الإلكتروني).
5) أضف حقلاً مثل role من النوع string وقيمته admin.
6) ارجع إلى /admin.html وحدّث الصفحة. لا تنشئ مستند admins للزوار.

ثالثاً: نشر مقالات البداية وإدارة المحتوى
----------------------------------------
1) بعد دخول المشرف، افتح تبويب المقالات.
2) اضغط «استيراد مقالات البداية» لإضافة أمثلة الشروحات إلى Firestore.
3) استخدم «شرح جديد» لإضافة مقال، أو تعديل/حذف للمقالات الموجودة.
4) تبويب التعليقات يسمح بحذف تعليق أو حظر UID صاحبه. الحظر يمنع الحساب من إضافة تعليقات وإعجابات جديدة.
5) الزوار يحصلون على جلسة Firebase مجهولة تلقائياً؛ لا يحتاجون تسجيل Google للتعليق، ويكتبون الاسم الظاهر في نموذج التعليق.

رابعاً: تفعيل وصول رسائل التواصل إلى بريدك
------------------------------------------
نموذج التواصل يستخدم EmailJS لإرسال الرسائل إلى بريد حيدر: haider.abaas6g@gmail.com.
1) أنشئ حساباً في https://www.emailjs.com.
2) أضف Email Service واربطه ببريدك الذي تريد استلام الرسائل عليه.
3) أنشئ Email Template واجعل To Email هو: haider.abaas6g@gmail.com. أضف المتغيرات التالية:
   From Name: {{from_name}}
   Reply To: {{reply_to}}
   Subject: {{subject}}
   Message: {{message}}
4) انسخ Public Key وService ID وTemplate ID إلى firebase-config.js.
5) غيّر configured إلى true.
6) اختبر النموذج من الموقع. راجع مجلد Spam أول مرة إذا لم تصل الرسالة إلى Inbox.

ملاحظات أمان وتشغيل
-------------------
- لا يوجد زر إدارة أو نموذج إضافة مقال في صفحة الزوار. لوحة الإدارة موجودة في /admin.html، لكن الرابط وحده ليس حماية؛ الحماية الفعلية من Firebase Authentication وFirestore Rules ومستند admins/{UID}.
- لا تضع مفاتيح Service Account أو مفاتيح Firebase Admin في ملفات الواجهة. Firebase Web API key وEmailJS Public Key مصممان للاستخدام من الواجهة مع قواعد وصلاحيات صحيحة.
- التعليقات والإعجابات والمقالات المنشورة في Firestore مشتركة بين الزوار والأجهزة.
- الصور حالياً تُضاف كرابط صورة مباشر. رفع الملفات إلى Firebase Storage غير مفعّل في هذه النسخة.
- حماية الحظر مرتبطة بحساب Firebase المجهول في متصفح الزائر؛ يمكن للمسيء تقنياً مسح بيانات المتصفح أو إنشاء جلسة جديدة. الحظر الأقوى ومقاومة السبام يحتاجان App Check أو تحققاً إضافياً/خدمة خادمية.
- أضف قواعد Firestore قبل النشر العام، ولا تترك قواعد الاختبار مفتوحة.
- يجب نشر الموقع عبر HTTPS (Cloudflare Pages مناسب)؛ لا تعتمد على فتح الملفات محلياً file:// لأن Firebase Auth يحتاج نطاقاً مسموحاً.
