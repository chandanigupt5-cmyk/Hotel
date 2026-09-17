  
        // Gallery Images List for Lightbox
        const galleryImages = [
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
        ];
        let currentLightboxIndex = 0;

        // Initialize Date Limits on Load
        document.addEventListener('DOMContentLoaded', () => {
            const today = new Date().toISOString().split('T')[0];
            const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

            const checkInInput = document.getElementById('checkInDate');
            const checkOutInput = document.getElementById('checkOutDate');
            const modalCheckIn = document.getElementById('modalCheckIn');
            const modalCheckOut = document.getElementById('modalCheckOut');

            if (checkInInput && checkOutInput) {
                checkInInput.min = today;
                checkInInput.value = today;
                checkOutInput.min = tomorrow;
                checkOutInput.value = tomorrow;

                checkInInput.addEventListener('change', (e) => {
                    const nextDay = new Date(new Date(e.target.value).getTime() + 86400000).toISOString().split('T')[0];
                    checkOutInput.min = nextDay;
                    if (checkOutInput.value <= e.target.value) {
                        checkOutInput.value = nextDay;
                    }
                });
            }

            if (modalCheckIn && modalCheckOut) {
                modalCheckIn.min = today;
                modalCheckIn.value = today;
                modalCheckOut.min = tomorrow;
                modalCheckOut.value = tomorrow;
            }
        });

        // Sticky Header & Back-to-top button
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            const backToTop = document.getElementById('backToTop');

            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            if (window.scrollY > 400) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }

            // Update Active Link on Scroll
            const sections = document.querySelectorAll('section[id]');
            const scrollY = window.pageYOffset;

            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 100;
                const sectionId = current.getAttribute('id');
                const link = document.querySelector(`.nav-links a[href*=${sectionId}]`);

                if (link) {
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                }
            });
        });

        // Mobile Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close Mobile Menu on Link Click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').className = 'fa-solid fa-bars';
            });
        });

        // Scroll to Top Function
        function scrollToTop() {
            window.scrollTo({top: 0, behavior: 'smooth'});
        }

        // Search Form Handling
        function handleAvailabilitySearch(e) {
            e.preventDefault();
            const checkIn = document.getElementById('checkInDate').value;
            const checkOut = document.getElementById('checkOutDate').value;

            showNoticeModal("Availability Check", `Thank you! We are checking availability for your dates (${checkIn} to ${checkOut}).`);
        }

        // Modal Controls
        function openBookingModal(roomType) {
            const modal = document.getElementById('bookingModal');
            const select = document.getElementById('modalRoomType');
            if (roomType && roomType !== 'General') {
                select.value = roomType;
            }
            modal.classList.add('active');
        }

        function closeBookingModal() {
            document.getElementById('bookingModal').classList.remove('active');
        }

        function handleModalSubmit(e) {
            e.preventDefault();
            closeBookingModal();
            showNoticeModal("Booking Request Sent!", "Your reservation request has been submitted successfully. Our front desk team will contact you shortly to confirm.");
        }

        function showNoticeModal(title, msg) {
            document.getElementById('noticeTitle').innerText = title;
            document.getElementById('noticeMessage').innerText = msg;
            document.getElementById('noticeModal').classList.add('active');
        }

        function closeNoticeModal() {
            document.getElementById('noticeModal').classList.remove('active');
        }

        // Gallery Filtering
        function filterGallery(category, btn) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const items = document.querySelectorAll('.gallery-item');
            items.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        // Lightbox Interactivity
        function openLightbox(index) {
            currentLightboxIndex = index;
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightboxImg');
            lightboxImg.src = galleryImages[currentLightboxIndex];
            lightbox.classList.add('active');
        }

        function closeLightbox() {
            document.getElementById('lightbox').classList.remove('active');
        }

        function changeLightboxImage(direction) {
            currentLightboxIndex = (currentLightboxIndex + direction + galleryImages.length) % galleryImages.length;
            document.getElementById('lightboxImg').src = galleryImages[currentLightboxIndex];
        }

        // Keyboard Navigation support for Escape and Arrow Keys
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeBookingModal();
                closeNoticeModal();
                closeLightbox();
            } else if (document.getElementById('lightbox').classList.contains('active')) {
                if (e.key === 'ArrowLeft') changeLightboxImage(-1);
                if (e.key === 'ArrowRight') changeLightboxImage(1);
            }
        });