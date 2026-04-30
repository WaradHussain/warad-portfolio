import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for waradhussain.com — how your data is collected, used, and protected.',
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-accent-green font-mono text-sm">legal.</span>
          <div className="flex-1 h-px bg-border-subtle" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-mono text-text-primary mb-3">
          Privacy Policy
        </h1>
        <p className="text-text-secondary font-sans text-sm">
          Last updated May 01, 2026
        </p>
      </div>

      {/* Policy content */}
      <div className="bg-bg-glass border border-border-glass rounded-xl p-6 md:p-10">
        <style>{`
          .policy-body { color: #d0d0d0; font-family: var(--font-dm-sans), sans-serif; font-size: 15px; line-height: 1.7; }
          .policy-body h1, .policy-body h2, .policy-body h3 { color: #F0F0F0; font-family: var(--font-dm-mono), monospace; margin-top: 2rem; margin-bottom: 0.75rem; }
          .policy-body h1 { font-size: 1.5rem; }
          .policy-body h2 { font-size: 1.15rem; color: #00E87A; }
          .policy-body h3 { font-size: 1rem; color: #aaaaaa; }
          .policy-body a { color: #00E87A !important; text-decoration: underline; word-break: break-word; }
          .policy-body a:hover { color: #00ff88 !important; }
          .policy-body ul { padding-left: 1.5rem; margin: 0.5rem 0; }
          .policy-body li { margin: 0.3rem 0; color: #d0d0d0; }
          .policy-body strong { color: #F0F0F0; }
          .policy-body em { color: #aaaaaa; }
          .policy-body table { width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 13px; }
          .policy-body table td, .policy-body table th { border: 1px solid #2a2a2a; padding: 8px 12px; color: #d0d0d0; vertical-align: top; }
          .policy-body table th { background: #1a1a1a; color: #F0F0F0; }
          /* Override Termly inline styles */
          .policy-body [style*="color: rgb(89, 89, 89)"],
          .policy-body [style*="color: rgb(127, 127, 127)"],
          .policy-body [style*="color:#595959"],
          .policy-body [data-custom-class="body_text"],
          .policy-body [data-custom-class="subtitle"] { color: #d0d0d0 !important; }
          .policy-body [data-custom-class="title"],
          .policy-body [data-custom-class="heading_1"],
          .policy-body [style*="color: rgb(0, 0, 0)"] { color: #F0F0F0 !important; }
          .policy-body [data-custom-class="heading_2"] { color: #00E87A !important; }
          .policy-body [data-custom-class="link"],
          .policy-body [style*="color: rgb(0, 58, 250)"],
          .policy-body [style*="color: rgb(48, 48, 241)"] { color: #00E87A !important; }
          .policy-body [data-custom-class="body"] { background: transparent !important; }
          /* Hide Termly logo */
          .policy-body > span:first-child { display: none !important; }
        `}</style>

        <div
          className="policy-body"
          dangerouslySetInnerHTML={{
            __html: `
<div data-custom-class="body">
<div><strong><span style="font-size: 26px;"><span data-custom-class="title"><h1>PRIVACY POLICY</h1></span></span></strong></div>
<div><span style="color: rgb(127, 127, 127);"><strong><span style="font-size: 15px;"><span data-custom-class="subtitle">Last updated May 01, 2026</span></span></strong></span></div>
<div><br></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text">This Privacy Notice for <strong>Warad Hussain</strong> ("we," "us," or "our") describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services, including when you visit our website at <a href="https://waradhussain.com" target="_blank">https://waradhussain.com</a> or engage with us in other related ways.</span></div>
<div><br></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text"><strong>Questions or concerns?</strong> If you have any questions or concerns, please contact us at <a href="mailto:contact@waradhussain.com">contact@waradhussain.com</a>.</span></div>
<div><br></div>

<div id="toc" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>TABLE OF CONTENTS</h2></span></strong></div>
<div style="line-height: 1.5;"><a href="#infocollect">1. WHAT INFORMATION DO WE COLLECT?</a></div>
<div style="line-height: 1.5;"><a href="#infouse">2. HOW DO WE PROCESS YOUR INFORMATION?</a></div>
<div style="line-height: 1.5;"><a href="#legalbases">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</a></div>
<div style="line-height: 1.5;"><a href="#whoshare">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></div>
<div style="line-height: 1.5;"><a href="#cookies">5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></div>
<div style="line-height: 1.5;"><a href="#inforetain">6. HOW LONG DO WE KEEP YOUR INFORMATION?</a></div>
<div style="line-height: 1.5;"><a href="#infosafe">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</a></div>
<div style="line-height: 1.5;"><a href="#privacyrights">8. WHAT ARE YOUR PRIVACY RIGHTS?</a></div>
<div style="line-height: 1.5;"><a href="#DNT">9. CONTROLS FOR DO-NOT-TRACK FEATURES</a></div>
<div style="line-height: 1.5;"><a href="#uslaws">10. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a></div>
<div style="line-height: 1.5;"><a href="#policyupdates">11. DO WE MAKE UPDATES TO THIS NOTICE?</a></div>
<div style="line-height: 1.5;"><a href="#contact">12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></div>
<div style="line-height: 1.5;"><a href="#request">13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a></div>
<div><br></div>

<div id="infocollect" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>1. WHAT INFORMATION DO WE COLLECT?</h2></span></strong></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text"><strong>Personal information you disclose to us:</strong> We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us. The personal information we collect may include: email addresses, phone numbers, names.</span></div>
<div><br></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text"><strong>Sensitive Information:</strong> We do not process sensitive information.</span></div>
<div><br></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text"><strong>Information automatically collected:</strong> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services. This information does not reveal your specific identity but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, and other technical information.</span></div>
<div><br></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text">Like many businesses, we also collect information through cookies and similar technologies.</span></div>
<div><br></div>

<div id="infouse" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>2. HOW DO WE PROCESS YOUR INFORMATION?</h2></span></strong></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text">We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We process your personal information for the following purposes: to deliver and facilitate delivery of services, to respond to user inquiries, to send administrative information, to send marketing and promotional communications (with your consent), to protect our Services, and to determine the effectiveness of our marketing campaigns.</span></div>
<div><br></div>

<div id="legalbases" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h2></span></strong></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text">We only process your personal information when we believe it is necessary and we have a valid legal reason to do so under applicable law, such as with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill our legitimate business interests.</span></div>
<div><br></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text">If you are located in the EU or UK, we rely on: Consent, Performance of a Contract, Legitimate Interests, Legal Obligations, and Vital Interests as our legal bases for processing.</span></div>
<div><br></div>

<div id="whoshare" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2></span></strong></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text">We may share information in specific situations: Business Transfers — we may share or transfer your information in connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</span></div>
<div><br></div>

<div id="cookies" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2></span></strong></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text">We may use cookies and similar tracking technologies to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services, prevent crashes, fix bugs, save your preferences, and assist with basic site functions. We also permit third parties and service providers (such as Google Analytics) to use online tracking technologies on our Services for analytics purposes. For more details, see our <a href="/cookie-policy">Cookie Policy</a>.</span></div>
<div><br></div>

<div id="inforetain" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>6. HOW LONG DO WE KEEP YOUR INFORMATION?</h2></span></strong></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text">We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law. When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it.</span></div>
<div><br></div>

<div id="infosafe" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>7. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2></span></strong></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text">We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</span></div>
<div><br></div>

<div id="privacyrights" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>8. WHAT ARE YOUR PRIVACY RIGHTS?</h2></span></strong></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text">Depending on where you are located, you may have the right to: request access to your personal information, request rectification or erasure, restrict the processing of your personal information, data portability, and to object to the processing of your personal information.</span></div>
<div><br></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text"><strong>Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time by contacting us at <a href="mailto:contact@waradhussain.com">contact@waradhussain.com</a>.</span></div>
<div><br></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text"><strong>Cookies:</strong> Most web browsers are set to accept cookies by default. You can choose to set your browser to remove or reject cookies. You can also manage your cookie preferences via the Consent Preferences link in the footer.</span></div>
<div><br></div>

<div id="DNT" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>9. CONTROLS FOR DO-NOT-TRACK FEATURES</h2></span></strong></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text">Most web browsers include a Do-Not-Track ("DNT") feature. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals. We do recognize and honor Global Privacy Control (GPC) signals.</span></div>
<div><br></div>

<div id="uslaws" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>10. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2></span></strong></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text">If you are a resident of California, Colorado, Connecticut, or other US states with privacy laws, you may have the right to request access to and receive details about the personal information we maintain about you, correct inaccuracies, get a copy of, or delete your personal information. To exercise these rights, please contact us at <a href="mailto:contact@waradhussain.com">contact@waradhussain.com</a>.</span></div>
<div><br></div>

<div id="policyupdates" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>11. DO WE MAKE UPDATES TO THIS NOTICE?</h2></span></strong></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text">Yes, we will update this notice as necessary to stay compliant with relevant laws. The updated version will be indicated by an updated date at the top of this Privacy Notice.</span></div>
<div><br></div>

<div id="contact" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2></span></strong></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text">If you have questions or comments about this notice, you may contact us at:</span></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text"><strong>Warad Hussain</strong><br>Karachi, Pakistan<br><a href="mailto:contact@waradhussain.com">contact@waradhussain.com</a></span></div>
<div><br></div>

<div id="request" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2></span></strong></div>
<div style="line-height: 1.5;"><span data-custom-class="body_text">Based on the applicable laws of your country or state of residence, you may have the right to request access to the personal information we collect from you, correct inaccuracies, or delete your personal information. To request to review, update, or delete your personal information, please email us at <a href="mailto:contact@waradhussain.com">contact@waradhussain.com</a>.</span></div>
</div>
            `,
          }}
        />
      </div>

    </section>
  )
}
