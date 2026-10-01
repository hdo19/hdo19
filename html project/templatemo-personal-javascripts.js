// ==========================================
// قاعدة بيانات الشروحات والمقالات التفصيلية
// ==========================================
const myChannelTutorials = [
    {
        id: 1,
        title: "شرح برنامج استرجاع الملفات المحذوفة R-Studio",
        desc: "دليل عملي لاستعادة ملفاتك الضائعة من الهارديسك أو الفلاش ميموري بكفاءة عالية.",
        tools: ["برنامج R-Studio", "حاسوب ويندوز"],
        articleContent: `
            في كثير من الأحيان قد نتعرض لحذف ملفات مهمة بالخطأ، أو فورمات عن طريق اللف والتحويل. 
            يعتبر برنامج R-Studio واحداً من أقوى وأدق البرامج المستخدمة في استرجاع الملفات المحذوفة حتى بعد التهيئة.
            في هذا الشرح سنستعرض خطوات تثبيت البرنامج بشكل صحيح، وكيفية فحص الأقراص بدقة، واستعادة الصور والملفات والمستندات المخفية.
            تأكد دائماً من عدم التخزين على نفس القرص الذي حذفت منه الملفات لكي لا تفقدها نهائياً قبل استعادتها.
        `,
        downloadUrl: "https://www.mediafire.com/file/o5xivo0f2pfvg6b/R-Studio_8.15.18015_Repack_%2526_Portable_by_9649.rar/file",
        videoUrl: "https://www.youtube.com/embed/DgSp0FvOfv8"
    },
    {
        id: 2,
        title: "رمته جهاز ريلمي C21Y بدون بوكسات او دناكل",
        desc: "الكثير يعاني من مشكله الهاتف العنيد   c21y  حاو هواتف ريلمي بصوره عامة صعوبه في الوصول الى وضع ريكيفري مود او وضع الفورمات بعد نسيان الباسورد ",
        tools: ["التوكل على اللة", "شاهد الفيديو للنهاية"],
        articleContent: `
            الكثير يعاني من مشكله الهاتف العنيد   c21y   هواتف ريلمي بصوره عامة بها صعوبه في الوصول الى وضع ريكيفري مود او وضع الفورمات بعد نسيان الباسورد      لكن مع حدور تك لا يوجد مستحيل 
        `,
     
        videoUrl: "https://www.youtube.com/embed/e972qd-I0Zc?si=1-tRT-KTCTon_eTW"
    },
    {
        id: 3,
        title: "شرح برنامج استرجاع الملفات المحذوفة R-Studio",
        desc: "دليل عملي لاستعادة ملفاتك الضائعة من الهارديسك أو الفلاش ميموري بكفاءة عالية.",
        tools: ["برنامج R-Studio", "حاسوب ويندوز"],
        articleContent: `
            في كثير من الأحيان قد نتعرض لحذف ملفات مهمة بالخطأ، أو فورمات عن طريق اللف والتحويل. 
            يعتبر برنامج R-Studio واحداً من أقوى وأدق البرامج المستخدمة في استرجاع الملفات المحذوفة حتى بعد التهيئة.
            في هذا الشرح سنستعرض خطوات تثبيت البرنامج بشكل صحيح، وكيفية فحص الأقراص بدقة، واستعادة الصور والملفات والمستندات المخفية.
            تأكد دائماً من عدم التخزين على نفس القرص الذي حذفت منه الملفات لكي لا تفقدها نهائياً قبل استعادتها.
        `,
        downloadUrl: "https://www.mediafire.com/file/o5xivo0f2pfvg6b/R-Studio_8.15.18015_Repack_%2526_Portable_by_9649.rar/file",
        videoUrl: "https://www.youtube.com/embed/DgSp0FvOfv8"
    }
];

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. نظام القائمة الجانبية للموبايل
    // ==========================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        const closeLinks = mobileMenu.querySelectorAll('.mobile-close-link');
        closeLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 2. نظام نافذة "تواصل معنا" المنبثقة
    // ==========================================
    const contactModal = document.getElementById('contactModal');
    const openDesktop = document.getElementById('openContactModalDesktop');
    const openMobile = document.getElementById('openContactModalMobile');
    const closeContact = document.getElementById('closeContactModal');

    function openModal(e) {
        if (e) e.preventDefault();
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');

        if (contactModal) {
            contactModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (contactModal) {
            contactModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    if (openDesktop) openDesktop.addEventListener('click', openModal);
    if (openMobile) openMobile.addEventListener('click', openModal);
    if (closeContact) closeContact.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeModal();
        }
    });

    // ==========================================
    // 3. نظام الشروحات والمقالات الديناميكية
    // ==========================================
    const container = document.getElementById('dynamic-tutorials-container');
    
    if (container) {
        function checkUrlAndRender() {
            const hash = window.location.hash;
            if (hash.startsWith('#article-')) {
                const articleId = parseInt(hash.replace('#article-', ''));
                const selectedTutorial = myChannelTutorials.find(t => t.id === articleId);
                if (selectedTutorial) {
                    renderSingleArticle(selectedTutorial);
                    return;
                }
            }
            renderTutorialsList();
        }

        function renderTutorialsList() {
            container.className = 'portfolio-grid';
            container.innerHTML = '';
            
            myChannelTutorials.forEach((tutorial) => {
                const card = document.createElement('div');
                card.className = 'portfolio-item';
                
                card.innerHTML = `
                    <div class="portfolio-content">
                        <h4>${tutorial.title}</h4>
                        <p>${tutorial.desc}</p>
                        <span style="display: inline-block; padding: 0.5rem 1rem; background: var(--primary-color); color: white; border-radius: 20px; font-size: 0.85rem; font-weight: bold; margin-top: 1rem;">اقرأ المقال والشرح ←</span>
                    </div>
                `;
                
                card.addEventListener('click', () => {
                    window.location.hash = `#article-${tutorial.id}`;
                    window.scrollTo({ top: container.offsetTop - 100, behavior: 'smooth' });
                });
                
                container.append(card);
            });
        }

        function renderSingleArticle(tutorial) {
            container.className = ''; 
            const otherTutorials = myChannelTutorials.filter(t => t.id !== tutorial.id);

            container.innerHTML = `
                <div style="background: var(--bg-card, #fff); padding: 3rem; border-radius: 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); text-align: right; margin-bottom: 4rem;">
                    <button id="back-to-list" style="padding: 0.6rem 1.5rem; background: var(--secondary-color); color: white; border: none; border-radius: 20px; cursor: pointer; font-weight: bold; margin-bottom: 2rem;">← العودة إلى قائمة الشروحات</button>
                    
                    <h2 style="font-size: 2.2rem; color: var(--text-primary); margin-bottom: 1.5rem;">${tutorial.title}</h2>
                    
                    <!-- نص المقال الكامل -->
                    <div style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 2.5rem; line-height: 2; white-space: pre-line;">
                        ${tutorial.articleContent}
                    </div>
                    
                    <!-- زر للتحميل اضغط هنا -->
                    ${tutorial.downloadUrl ? `
                        <div style="margin: 2.5rem 0; text-align: center;">
                            <a href="${tutorial.downloadUrl}" target="_blank" style="display: inline-block; padding: 1rem 3rem; background: #10b981; color: white; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 1.1rem; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);">
                                للتحميل اضغط هنا 📥
                            </a>
                        </div>
                    ` : ''}

                    <hr style="border: 0; border-top: 1px solid rgba(0,0,0,0.1); margin: 3rem 0;">
                    
                    <!-- مشاهدة الشرح الكامل على يوتيوب -->
                    <h3 style="color: var(--primary-color); margin-bottom: 1rem; font-size: 1.4rem; text-align: center;">📺 مشاهدة الشرح الكامل على يوتيوب:</h3>
                    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 20px; background: #000;">
                        <iframe src="${tutorial.videoUrl}" style="position: absolute; top:0; left:0; width:100%; height:100%; border:0;" allowfullscreen></iframe>
                    </div>
                </div>

                <div style="margin-top: 4rem;">
                    <h3 style="font-size: 1.8rem; margin-bottom: 2rem; text-align: center; color: var(--text-primary);">شروحات ومقالات أخرى قد تعجبك:</h3>
                    <div class="portfolio-grid" id="other-tutorials-grid"></div>
                </div>
            `;
            
            document.getElementById('back-to-list').addEventListener('click', () => {
                window.location.hash = '#portfolio';
                renderTutorialsList();
                window.scrollTo({ top: container.offsetTop - 100, behavior: 'smooth' });
            });

            const otherGrid = document.getElementById('other-tutorials-grid');
            otherTutorials.forEach((other) => {
                const otherCard = document.createElement('div');
                otherCard.className = 'portfolio-item';
                otherCard.innerHTML = `
                    <div class="portfolio-content">
                        <h4>${other.title}</h4>
                        <p>${other.desc}</p>
                        <span style="display: inline-block; padding: 0.4rem 1rem; background: var(--primary-color); color: white; border-radius: 20px; font-size: 0.85rem; font-weight: bold; margin-top: 1rem;">اقرأ المقال ←</span>
                    </div>
                `;
                otherCard.addEventListener('click', () => {
                    window.location.hash = `#article-${other.id}`;
                    checkUrlAndRender();
                    window.scrollTo({ top: container.offsetTop - 100, behavior: 'smooth' });
                });
                otherGrid.append(otherCard);
            });
        }

        window.addEventListener('hashchange', checkUrlAndRender);
        checkUrlAndRender();
    }

    // ==========================================
    // 4. حماية نموذج الاتصال
    // ==========================================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const lastSentTime = localStorage.getItem('lastMessageTime');
            const now = new Date().getTime();
            const oneHourInMs = 1 * 60 * 60 * 1000;

            if (lastSentTime && (now - lastSentTime < oneHourInMs)) {
                e.preventDefault();
                const remainingMinutes = Math.ceil((oneHourInMs - (now - lastSentTime)) / (1000 * 60));
                alert(`عذراً، لقد أرسلت رسالة مسبقاً. يمكنك إرسال رسالة أخرى بعد ${remainingMinutes} دقيقة لمنع الازدحام والسبام.`);
                return;
            }

            localStorage.setItem('lastMessageTime', now);
        });
    }
});