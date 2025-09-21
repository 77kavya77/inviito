// footer.js
function createFooter() {
    // Create footer element
    const footer = document.createElement('footer');

    // Set footer HTML content
    footer.innerHTML = `
        <div class="footer-content">
            <div class="footer-brand">
                <div class="footer-logo">
                    <img src="assets/img/logo.png" alt="Inviito Logo" class="footer-logo-img" />
                    <span>Invi<span class="footer-logo-accent">ito</span></span>
                </div>
                <p class="footer-text">Creating beautiful digital invitations for your special occasions. Elegant,
                    customizable, and delivered instantly.</p>
                <div class="social-links">
                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    <a href="https://www.instagram.com/inviito/"><i class="fab fa-instagram"></i></a>
                    <a href="https://wa.me/8921242289?text=Hello! I want to order a digital invitation template"><i
                            class="fab fa-whatsapp"></i></a>
                </div>
            </div>
            <div class="footer-links-wrapper">
                <div class="footer-links">
                    <h3>Quick Links</h3>
                    <a href="index.html#awareness">Eco-Friendly</a>
                    <a href="index.html#gallery">Our Templates</a>
                    <a href="index.html#how-it-works">How It Works</a>
                    <a href="index.html#faq">FAQ</a>
                    <a href="templates.html">All Templates</a>
                </div>

                <div class="footer-links">
                    <h3>Invitation Types</h3>
                    <a href="#gallery">Wedding</a>
                    <a href="#gallery">Birthday</a>
                    <a href="#gallery">Anniversary</a>
                    <a href="#gallery">Baby Shower</a>
                    <a href="#gallery">Corporate</a>
                </div>
            </div>
        </div>

        <div class="copyright">
            <p>© 2025 Inviito. All rights reserved.</p>
        </div>
    `;

    // Create style element
    const style = document.createElement('style');
    style.textContent = `
        /* Footer */
        footer {
            width: 100vw;
            /* or 100% */
            position: relative;
            left: 50%;
            right: 50%;
            margin-left: -50vw;
            margin-right: -50vw;
            padding: 60px 20px 30px;
            background: #0F0F1B;
            margin-top: 0px;
            /* Add this line for spacing */
        }

        .footer-content {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            max-width: 1200px;
            margin: 0 auto;
            gap: 40px;
        }

        .footer-brand {
            flex: 1 1 300px;
        }

        .footer-logo {
            display: flex;
            align-items: center;
            font-size: 2.4rem;           /* Slightly larger text */
            font-weight: 700;
            margin-bottom: 15px;
            color: var(--light, #ffffff);
            gap: 16px;                   /* Slightly more gap */
        }

        .footer-logo-img {
            height: 50px;                /* Increase logo size */
            width: 50px;
            min-width: 3rem;
            object-fit: contain;
            margin: 0;
            display: block;
        }

        .footer-logo-accent {
            color: var(--primary, #8a2be2);
        }

        .footer-text {
            color: #CCCCDD;
            margin-bottom: 20px;
            max-width: 300px;
        }

        .social-links {
            display: flex;
            gap: 15px;
        }

        .social-links a {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary, #8a2be2) 0%, var(--secondary, #5d1baa) 100%);
            color: white;
            font-size: 1.2rem;
            transition: all 0.3s ease;
            text-decoration: none;
        }

        .social-links a:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(138, 43, 226, 0.4);
        }

        .footer-links-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: flex-start;
            gap: 258px;
        }

        .footer-links {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        .footer-links h3 {
            font-size: 1.3rem;
            margin-bottom: 20px;
            color: var(--light, #ffffff);
        }

        .footer-links a {
            color: #CCCCDD;
            text-decoration: none;
            margin-bottom: 10px;
            transition: color 0.3s ease;
        }

        .footer-links a:hover {
            color: var(--primary, #8a2be2);
        }

        .copyright {
            text-align: center;
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: #CCCCDD;
            font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
            .footer-content {
                flex-direction: column;
                align-items: center;
                text-align: center;
                gap: 32px;
            }

            .social-links {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 30px auto;
                width: 100%;
                gap: 18px;
                /* optional: space between icons */
            }

            /* Make only the links horizontal */
            .footer-links {
                flex-direction: column;
                align-items: center;
                text-align: center;
                min-width: 120px;
            }

            /* Wrap both link sections in a horizontal row */
            .footer-links:nth-of-type(2),
            .footer-links:nth-of-type(3) {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .footer-content {
                flex-wrap: wrap;
            }

            /* Horizontal row for both link columns */
            .footer-links:nth-of-type(2),
            .footer-links:nth-of-type(3) {
                margin: 0 12px;
            }

            .footer-brand {
                margin-bottom: 24px;
            }

            /* This wrapper will make both link columns horizontal */
            .footer-content {
                flex-direction: column;
                align-items: center;

            }

            .footer-links-wrapper {
                display: flex;
                flex-direction: row;
                justify-content: center;
                gap: 24px;
                width: 100%;
            }
            
            .footer-logo-img {
                height: 50px;
                width: 50px;
            }
        }
    `;

    // Add styles to document head
    document.head.appendChild(style);

    // Add footer to document body
    document.body.appendChild(footer);
}

// Call the function when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createFooter);
} else {
    createFooter();

}

