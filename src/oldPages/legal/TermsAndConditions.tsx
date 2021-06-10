import React from 'react';
import Layout from '../../app/Layout';
import Helmet from '../../components/Helmet';
import { SplashPage } from './SplashPage';
import Analytics from '../../analytics/analytics';
import PAGES from '../../analytics/pages';
import styled from '@emotion/styled';

const BoxedParagraph = styled.p`
  border: 1px solid;
  font-weight: 500;
  padding: 5px;
`;

class TermsAndConditions extends React.Component {
  componentDidMount() {
    Analytics.trackPage(PAGES.TERMS_CONDITIONS);
  }

  render() {
    const title = 'Terms & Conditions';
    const description = 'Please read our Terms & Conditions';
    const image =
      'https://img.livefeather.com/pages-new/About/Wall.png?auto=compress&sat=45&q=65&sharp=10&fm=jpg&w=600';

    return (
      <Layout>
        <div className="utility-page body">
          <Helmet title={title} description={description} imageUrl={image} />
          <SplashPage
            image="https://img.livefeather.com/pages-new/About/Wall.png?auto=compress&sat=45&q=15&sharp=10&fm=jpg"
            title="Terms and conditions"
          />
          <div className="utility-page-body">
            <div className="section-container">
              <h2>TERMS AND CONDITIONS</h2>
              <p>
                <i>Last Revised on August 31st, 2020</i>
              </p>
              <p>
                Welcome to the Terms and Conditions (these <strong>“Terms”</strong>) for the website,{' '}
                <a href="https://www.livefeather.com/" target="_blank" rel="noopener noreferrer">
                  www.livefeather.com
                </a>{' '}
                (the <strong>“Website”</strong>), operated on behalf of Feather Home Inc. (<strong>“Company”</strong>,{' '}
                <strong>“we”</strong> or <strong>“us”</strong>), and together with any content, tools, features and
                functionality and other services offered on or through our Website (the <strong>“Services”</strong>).
              </p>
              <p>
                These Terms govern your access to and use of the Services. Please read these Terms carefully, as they
                include important information about your legal rights. By accessing and/or using the Services, you are
                agreeing to these Terms. If you do not understand or agree to these Terms, please do not use the
                Services.
              </p>
              <p>
                For purposes of these Terms, <strong>“you”</strong> and <strong>“your”</strong> means you as the user of
                the Services. If you use the Services on behalf of a company or other entity then “you” includes you and
                that entity, and you represent and warrant that (a) you are an authorized representative of the entity
                with the authority to bind the entity to these Terms, and (b) you agree to these Terms on the entity's
                behalf.
              </p>
              <BoxedParagraph>
                Please note that Section 9 contains an arbitration clause and class action waiver. By agreeing to these
                Terms, you agree (a) to resolve all disputes with us through binding individual arbitration, which means
                that you waive any right to have those disputes decided by a judge or jury, and (b) that you waive your
                right to participate in class, consolidated, representative, or collective actions and class,
                consolidated, representative, or collective arbitrations. You have the right to opt-out of arbitration
                as explained in Section 9.
              </BoxedParagraph>
              <h3>1. WHO MAY USE THE SERVICES</h3>
              <p>
                You must be 18 years of age or older and reside in the United States or any of its territories to use
                the Services. By using the Services, you represent and warrant that you meet these requirements.
              </p>
              <h3>2. USER ACCOUNTS, LEASE AGREEMENT, MEMBERSHIP</h3>
              <p>
                2.1 <u>Creating and Safeguarding your Account</u>. To use certain of the Services, you may need to
                create an account (<strong>“Account”</strong>). You agree to provide us with accurate, complete and
                updated information for your Account. You can access, edit and update your Account by activating your
                Account on the Accounts page on livefeather.com. You can use the Accounts page to update payment method,
                Account password, or contact the Company. You are solely responsible for any activity on your Account
                and for maintaining the confidentiality and security of your password. We are not liable for any acts or
                omissions by you in connection with your Account. You must immediately notify us at
                <a href="mailto:hello@livefeather.com">hello@livefeather.com</a> if you know or have any reason to
                suspect that your Account or password have been stolen, misappropriated or otherwise compromised, or in
                case of any actual or suspected unauthorized use of your Account.
              </p>
              <p>
                2.2 <u>Lease Agreement</u>. The Services permit you to view our inventory of rental furniture items (
                <strong>“Furniture Items”</strong>) and the applicable prices associated with leasing Furniture Items.
                In order to lease Furniture Items from us, you will be required to sign a furniture lease agreement (
                <strong>“Lease Agreement”</strong>) as further described in these Terms. You must carefully review,
                understand and agree to the terms and conditions of your Lease Agreement prior to signing your Lease
                Agreement. Your Lease Agreement may be provided to you in electronic format and we may request your
                signature indicating your agreement to the terms and conditions of your Lease Agreement be provided via
                electronic means.
              </p>
              <p>
                2.3 <u>Membership</u>. Although you may order Furniture Items without a membership, our membership
                provides access to lower prices for Furniture Items and the certain other benefits.
              </p>
              <h3>3. SELECTION OF FURNITURE, CREDIT CHECKS, ORDERS, PAYMENT</h3>
              <p>
                3.1 <u>Selection of Furniture Items; Credit Checks</u>. If you desire to lease any Furniture Items or
                utilize any Services, you may be required to (a) provide certain information about yourself, including
                personal information such as your name, address and email address, (b) provide payment information to
                our third-party payment processor for the purpose of future processing of any payments to us that you
                authorize, (c) submit to a soft credit check and share certain personal information with third parties
                for such purpose, and/or (d) specify your income and provide documentation to verify the same. If the
                Company, in its sole discretion, determines that the results of the soft credit check do not meet its
                requirements, you will be denied the ability to move forward with leasing any Furniture Items and any
                payment method you may have provided will not be charged. If the Company, in its sole discretion,
                determines the results of the soft credit check meet its requirements and otherwise agrees to lease
                Furniture Items to you, you will be asked to make a payment towards your selected Furniture Items and,
                if applicable, membership fees and/or a refundable security deposit. However, any amounts paid
                constitute a hold for the selected Furniture Items, and if you do not sign your Lease Agreement within
                the timeframe required by the Company, the Company will return to you any funds you have paid to the
                Company towards those held Furniture Items. If you sign your Lease Agreement, then those funds will be
                applied to your first payment due at signing of your Agreement and, unless there are changes made to
                your Furniture Items before signing your Lease Agreement, you will not owe the Company any further
                payments when you sign your Lease Agreement.
              </p>
              <p>
                3.2 <u>Order Confirmation; Account Manager</u>. Once payment is made, we will email you an order
                confirmation detailing the Furniture Items or other Services you selected. Your receipt of an order
                confirmation, however, does not signify our acceptance of your order of your selected Furniture Items
                and other Services, nor does it constitute confirmation of our offer to lease those Furniture Items or
                otherwise provide Services; we are simply confirming that we received your order. It is possible that
                during the period between checkout of your selected Furniture Items on the Website and signing of your
                Lease Agreement all or some of your selected Furniture Items may become no longer available. In
                addition, any delivery dates requested during the checkout process on the Website are not guaranteed.
                One of our account managers will contact you within a few days after your receipt of the order
                confirmation to discuss the availability of your selected Furniture Items and your requested delivery
                date, and based on that discussion, we will send you a Lease Agreement for signature that specifies the
                Furniture Items covered by that Lease Agreement, the delivery date of those Furniture Items, additional
                amounts due by you at signing (if any) and during the term of the Lease Agreement, among other important
                matters. If during your discussions with our account manager any changes are made to the Furniture Items
                that result in your overpayment of any amounts, then we will refund to you the applicable amount. If any
                changes are made that result in underpayments of your first monthly payment, then we will bill you for
                such amount which will be due upon signing of your Lease Agreement. If you do not sign your Lease
                Agreement by the date required by the Company any agreed upon delivery dates between you and your
                account manager will be lost.
              </p>
              <p>
                3.3 <u>Payment</u>. You agree to pay us all applicable fees and taxes in U.S. Dollars. Payment can be
                made by credit card, debit card or other means that we may make available. You agree that (a) we may
                store your payment method (e.g. credit card), and (b) we may calculate taxes payable by you based on the
                delivery address that you provide us at the time of checkout, and you authorize us to charge your
                payment method for all Furniture Items rental fees, membership fees (if any), other fees as described in
                your Lease Agreement and applicable taxes. You represent and warrant that you have the legal right to
                use the payment method you provide to us or our payment processor. All fees and charges are payable in
                accordance with payment terms in effect at the time the fee or the charge becomes payable.
              </p>
              <p>
                3.4 <u>Promotional Codes</u>. We may offer certain promotional codes, referral codes, discount codes,
                coupon codes or similar offers (<strong>“Promotional Codes”</strong>) that may be redeemed for discounts
                on Furniture Items, subject to any terms and conditions that the Company establishes. Promotional Codes
                that are percentage-based discounts will only apply to the specific Furniture Items rented at checkout,
                and will not apply to any future exchanges or additions of Furniture Items to your Account. Promotional
                Codes that are fixed-amount discounts may only be used in one transaction and any unused amounts
                associated with a Promotional Code will automatically expire. Promotional Codes, of any kind, do not
                apply towards Lease Agreements with initial lease terms of three (3) months ("Short-Term Plans"),
                membership fees, delivery or assembly fees, or taxes. You agree that Promotional Codes: (a) must be used
                in a lawful manner; (b) must be used for the intended audience and purpose; (c) may not be duplicated,
                sold or transferred in any manner, or made available by you to the general public (whether posted to a
                public forum, coupon collecting service, or otherwise), unless expressly permitted by the Company; (d)
                may be disabled or have additional conditions applied to them by the Company at any time for any reason
                without liability to the Company; (e) may only be used pursuant to the specific terms that the Company
                establishes for such Promotional Code; (f) are not valid for cash or other credits or points; (g) may
                not be combined; (h) are limited to one use per customer and (h) may expire prior to your use.
              </p>
              <p>
                3.5 <u>Gift Cards</u>. Tangible and/or digital gift cards containing stored money value may be offered
                by us for the rental or purchase of Furniture Items (<strong>“Gift Cards”</strong>). You acknowledge
                that the Company does not make any warranties with respect to your Gift Card balance and is not
                responsible for any unauthorized access to, or alteration, theft, or destruction of a Gift Card or Gift
                Card code that results from any action by you or a third party. You also acknowledge that we may suspend
                or prohibit use of your Gift Card if your Gift Card or Gift Card code has been reported lost or stolen,
                or if we believe your Gift Card balance is being used suspiciously, fraudulently, or in an otherwise
                unauthorized manner. If your Gift Card code stops working, your only remedy is for us to issue you a
                replacement Gift Card code. By purchasing a Gift Card, you represent and warrant to the Company that use
                of the Gift Card will comply with these Terms and all applicable laws, rules and regulations, and the
                Gift Card will not be used in any manner that is misleading, deceptive, unfair or otherwise harmful to
                consumers. Gift Cards cannot be used to purchase other gift cards, reloaded, resold, used for payment
                outside of the Services, used for unauthorized marketing, sweepstakes, advertising, or other promotional
                purposes, redeemed for more than face value, transferred for value, redeemed for cash, or returned for a
                cash refund (except to the extent required by law).
              </p>
              <p>
                3.6 <u>Changes and Pricing</u>. We reserve the right to change our member and non-member plans or adjust
                pricing for the Services in any manner and at any time as we may determine in our sole and absolute
                discretion. The Company may, at any time, revise or change the pricing, availability, specifications,
                content, descriptions or features of any Furniture Items. While we attempt to be as accurate as we can
                in our descriptions for the Furniture Items, we do not warrant that descriptions of Furniture Items are
                accurate, complete, reliable, current, or error-free. The inclusion of any Furniture Items for rental
                through the Services at a particular time does not imply or warrant that such Furniture Items will be
                available at any other time. We reserve the right to discontinue, modify or limit the available quantity
                of, any Furniture Items or other Services. We reserve the right to change prices for Furniture Items
                displayed on the Services at any time, and to correct pricing errors that may inadvertently occur (and
                to cancel any orders in our sole discretion that were purchased with pricing errors). All such changes
                shall be effective immediately upon posting of such new Furniture Items prices to the Services and/or
                upon making the customer aware of the pricing error.
              </p>
              <p>
                3.7 <u>Third Party Items</u>. Certain of the Furniture Items made available on the Services are
                manufactured by third parties (<strong>“Third Party Items”</strong>). The availability of Third Party
                Items through the Services does not indicate an affiliation with or endorsement by us of any Third Party
                Item or its manufacturer.{' '}
              </p>
              <p>
                3.8 <u>No Information of Children</u>. Users are not allowed to give the Company the personal
                information of any persons under the age of 13 for delivery purposes or any other reason.
              </p>
              <h3>4. LOCATION OF OUR PRIVACY POLICY</h3>
              <p>
                4.1 <u>Privacy Policy</u>. Our Privacy Policy describes how we handle the information you provide to us
                when you use the Services. For an explanation of our privacy practices, please visit our Privacy Policy
                located at{' '}
                <a href="https://www.livefeather.com/privacy-policy" target="_blank" rel="noopener noreferrer">
                  https://www.livefeather.com/privacy-policy
                </a>
                .
              </p>
              <h3>5. RIGHTS WE GRANT YOU</h3>
              <p>
                5.1 <u>License Grant</u>. Subject to your compliance with these Terms, the Company hereby grants to you,
                a personal, worldwide, royalty-free, non-assignable, non-sublicensable, non-transferrable, and
                non-exclusive license to use the software provided to you as part of the Services. This license has the
                sole purpose of enabling you to use and enjoy the benefit of the Services as provided by us, in the
                manner permitted by these Terms and subject to the use restrictions described below. Your access and use
                of the Services may be interrupted from time to time for any of several reasons, including, without
                limitation, the malfunction of equipment, periodic updating, maintenance or repair of the Service or
                other actions that Company, in its sole discretion, may elect to take.
              </p>

              <p>
                5.2 <u>Restrictions On Your Use of the Services</u>. You may not do any of the following, unless
                applicable laws or regulations prohibit these restrictions or you have our written permission to do so:
                <ol type="a">
                  <li>
                    download, modify, copy, distribute, transmit, display, perform, reproduce, duplicate, publish,
                    license, create derivative works from, or offer for sale any information contained on, or obtained
                    from or through, the Services;
                  </li>
                  <li>
                    duplicate, decompile, reverse engineer, disassemble or decode the Services (including any underlying
                    idea or algorithm), or attempt to do any of the same;
                  </li>
                  <li>
                    use, reproduce or remove any copyright, trademark, service mark, trade name, slogan, logo, image, or
                    other proprietary notation displayed on or through the Services;
                  </li>
                  <li>
                    use automation software (bots), hacks, modifications (mods) or any other unauthorized third-party
                    software designed to modify the Services;
                  </li>
                  <li>
                    exploit the Services for any commercial purpose, including without limitation communicating or
                    facilitating any commercial advertisement or solicitation;
                  </li>
                  <li>
                    access or use the Services in any manner that could disable, overburden, damage, disrupt or impair
                    the Services or interfere with any other party's access to or use of the Services or use any device,
                    software or routine that causes the same;
                  </li>
                  <li>
                    attempt to gain unauthorized access to, interfere with, damage or disrupt the Services, accounts
                    registered to other users, or the computer systems or networks connected to the Services;
                  </li>
                  <li>
                    circumvent, remove, alter, deactivate, degrade or thwart any technological measure or content
                    protections of the Services;
                  </li>
                  <li>
                    use any robot, spider, crawlers or other automatic device, process, software or queries that
                    intercepts, “mines,” scrapes or otherwise accesses the Services to monitor, extract, copy or collect
                    information or data from or through the Services, or engage in any manual process to do the same;
                  </li>
                  <li>
                    introduce any viruses, trojan horses, worms, logic bombs or other materials that are malicious or
                    technologically harmful into our systems;
                  </li>
                  <li>use the Services for illegal, harassing, unethical, or disruptive purposes;</li>
                  <li>
                    violate any applicable law, rule or regulation in connection with your access to or use of the
                    Services; or
                  </li>
                  <li>access or use the Services in any way not expressly permitted by these Terms.</li>
                </ol>
              </p>

              <h3>6. OWNERSHIP AND CONTENT</h3>
              <p>
                6.1 <u>Ownership of the Services</u>. The Services, including their "look and feel" (e.g., text,
                graphics, images, logos), proprietary content, information and other materials, are protected under
                copyright, trademark and other intellectual property laws. You agree that the Company and/or its
                licensors own all right, title and interest in and to the Services (including any and all intellectual
                property rights therein) and you agree not to take any action(s) inconsistent with such ownership
                interests. We and our licensors reserve all rights in connection with the Services and its content,
                including, without limitation, the exclusive right to create derivative works.
              </p>
              <p>
                6.2 <u>Ownership of Trademarks</u>. The Company’s name, the Company’s logo and all related names, logos,
                product and service names, designs and slogans are trademarks of the Company or its affiliates or
                licensors. Other names, logos, product and service names, designs and slogans that appear on the
                Services are the property of their respective owners, who may or may not be affiliated with, connected
                to, or sponsored by us.
              </p>
              <p>
                6.3 <u>Ownership of Feedback</u>. We welcome feedback, comments and suggestions for improvements to the
                Services (<strong>“Feedback”</strong>). You acknowledge and expressly agree that any contribution of
                Feedback does not and will not give or grant you any right, title or interest in the Services or in any
                such Feedback. All Feedback becomes the sole and exclusive property of the Company, and the Company may
                use and disclose Feedback in any manner and for any purpose whatsoever without further notice or
                compensation to you and without retention by you of any proprietary or other right or claim. You hereby
                assign to the Company any and all right, title and interest (including, but not limited to, any patent,
                copyright, trade secret, trademark, show-how, know-how, moral rights and any and all other intellectual
                property right) that you may have in and to any and all Feedback.
              </p>
              <p>
                6.4 <u>Posted Content</u>. In connection with your use of the Services, you may be able to post, upload,
                or submit reviews, comments, photos, videos, and other content to be made available through the Services
                (<strong>“Posted Content”</strong>). By using the Service and posting Posted Content, you grant us a
                license to access, use, host, cache, store, reproduce, transmit, display, publish, perform, translate,
                create derivative works of, distribute, adapt and modify Posted Content. You agree that these rights and
                licenses are royalty free, perpetual, transferable, sub-licensable, worldwide and irrevocable. You grant
                the Company and its sublicensees the right to use the name that you submit in connection with Posted
                Content. By posting or submitting Posted Content through the Services, you represent and warrant that
                (a) you have, or have obtained, all rights, licenses, consents, permissions, power and/or authority
                necessary to grant the rights granted herein for Posted Content, (b) Posted Content is accurate, and (c)
                Posted Content and the use of Posted Content does not violate these Terms.
              </p>
              <p>
                6.5 <u>Notice of Infringement – DMCA Policy</u>. If you believe that any text, graphics, photos, audio,
                videos or other materials or works uploaded, downloaded or appearing on the Services have been copied in
                a way that constitutes copyright infringement, you may submit a notification to our copyright agent in
                accordance with 17 USC 512(c) of the Digital Millennium Copyright Act (the <strong>“DMCA”</strong>), by
                providing the following information in writing:
                <ol type="a">
                  <li>identification of the copyrighted work that is claimed to be infringed;</li>
                  <li>
                    identification of the allegedly infringing material that is requested to be removed, including a
                    description of where it is located on the Service;
                  </li>
                  <li>
                    information for our copyright agent to contact you, such as an address, telephone number and e-mail
                    address;
                  </li>
                  <li>
                    a statement that you have a good faith belief that the identified, allegedly infringing use is not
                    authorized by the copyright owners, its agent or the law;
                  </li>
                  <li>
                    a statement that the information above is accurate, and under penalty of perjury, that you are the
                    copyright owner or the authorized person to act on behalf of the copyright owner; and
                  </li>
                  <li>
                    the physical or electronic signature of a person authorized to act on behalf of the owner of the
                    copyright or of an exclusive right that is allegedly infringed.
                  </li>
                </ol>
                Notices of copyright infringement claims should be sent by mail to: Feather Home Inc., Attn: Legal Dept,
                459 Broadway, Fifth Floor, New York, New York 10013; or by e-mail to{' '}
                <a href="mailto:legal@livefeather.com">legal@livefeather.com</a>. It is our policy, in appropriate
                circumstances and at our discretion, to disable or terminate the accounts of users who repeatedly
                infringe copyrights or intellectual property rights of others.
              </p>

              <h3>7. THIRD PARTY SERVICES AND MATERIALS</h3>
              <p>
                7.1 <u>Use of Third Party Materials in the Services</u>. Certain Services may display, include or make
                available content, data, information, applications or materials from third parties (
                <strong>“Third Party Materials”</strong>) or provide links to certain third party websites. By using the
                Services, you acknowledge and agree that the Company is not responsible for examining or evaluating the
                content, accuracy, completeness, availability, timeliness, validity, copyright compliance, legality,
                decency, quality or any other aspect of such Third Party Materials or websites. We do not warrant or
                endorse and do not assume and will not have any liability or responsibility to you or any other person
                for any third-party services, Third Party Materials or third-party websites, or for any other materials,
                products, or services of third parties. Third Party Materials and links to other websites are provided
                solely as a convenience to you.
              </p>

              <h3>8. DISCLAIMERS, LIMITATIONS OF LIABILITY AND INDEMNIFICATION</h3>
              <p>
                8.1 <u>Disclaimers</u>. Your access to and use of the Services are at your own risk. You understand and
                agree that the Services are provided to you on an “AS IS” and “AS AVAILABLE” basis. Without limiting the
                foregoing, to the maximum extent permitted under applicable law, the Company, its parents, affiliates,
                related companies, officers, directors, employees, agents, representatives, partners and licensors (the
                <strong>“Company Entities”</strong>) DISCLAIM ALL WARRANTIES AND CONDITIONS, WHETHER EXPRESS OR IMPLIED,
                OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT. The Company Entities make no
                warranty or representation and disclaim all responsibility and liability for: (a) the completeness,
                accuracy, availability, timeliness, security or reliability of the Services; (b) any harm to your
                computer system, loss of data, or other harm that results from your access to or use of the Services;
                (c) the operation or compatibility with any other application or any particular system or device; and
                (d) whether the Services will meet your requirements or be available on an uninterrupted, secure or
                error-free basis. No advice or information, whether oral or written, obtained from the Company Entities
                or through the Services, will create any warranty or representation not expressly made herein.
              </p>
              <p>
                8.2 <u>Limitations of Liability</u>. TO THE EXTENT NOT PROHIBITED BY LAW, YOU AGREE THAT IN NO EVENT
                WILL THE COMPANY ENTITIES BE LIABLE (A) FOR DAMAGES OF ANY KIND, INCLUDING DIRECT, INDIRECT, SPECIAL,
                EXEMPLARY, INCIDENTAL, CONSEQUENTIAL OR PUNITIVE DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
                SUBSTITUTE GOODS OR SERVICES, LOSS OF USE, DATA OR PROFITS, BUSINESS INTERRUPTION OR ANY OTHER DAMAGES
                OR LOSSES, ARISING OUT OF OR RELATED TO YOUR USE OR INABILITY TO USE THE SERVICES), HOWEVER CAUSED AND
                UNDER ANY THEORY OF LIABILITY, WHETHER UNDER THESE TERMS OR OTHERWISE ARISING IN ANY WAY IN CONNECTION
                WITH THE SERVICES OR THESE TERMS AND WHETHER IN CONTRACT, STRICT LIABILITY OR TORT (INCLUDING NEGLIGENCE
                OR OTHERWISE) EVEN IF THE COMPANY ENTITIES HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE, OR (B)
                FOR ANY OTHER CLAIM, DEMAND OR DAMAGES WHATSOEVER RESULTING FROM OR ARISING OUT OF OR IN CONNECTION WITH
                THESE TERMS OR THE DELIVERY, USE OR PERFORMANCE OF THE SERVICES. SOME JURISDICTIONS (SUCH AS THE STATE
                OF NEW JERSEY) DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE
                ABOVE EXCLUSION OR LIMITATION MAY NOT APPLY TO YOU. THE COMPANY ENTITIES’ TOTAL LIABILITY TO YOU FOR ANY
                DAMAGES FINALLY AWARDED SHALL NOT EXCEED THE AMOUNT OF ONE HUNDRED DOLLARS ($100.00), OR THE AMOUNT YOU
                PAID THE COMPANY ENTITIES, IF ANY, IN THE PAST SIX (6) MONTHS FOR THE SERVICES GIVING RISE TO THE CLAIM.
                THE FOREGOING LIMITATIONS WILL APPLY EVEN IF THE ABOVE STATED REMEDY FAILS OF ITS ESSENTIAL PURPOSE.
              </p>
              <p>
                8.3 <u>Indemnification</u>. By entering into these Terms and accessing or using the Services, you agree
                that you shall defend, indemnify and hold the Company Entities harmless from and against any and all
                claims, costs, damages, losses, liabilities and expenses (including attorneys’ fees and costs) incurred
                by the Company Entities arising out of or in connection with: (a) your violation or breach of any term
                of these Terms or any applicable law, rule or regulation; (b) your violation of any rights of any third
                party; (c) your access to or use of the Services; (d) Posted Content, or (e) your negligence or wilful
                misconduct.
              </p>

              <h3>
                9. DISPUTE RESOLUTION AND ARBITRATION.{' '}
                <u>
                  PLEASE READ THE FOLLOWING DISPUTE RESOLUTION AND ARBITRATION PROVISIONS CAREFULLY. IT REQUIRES YOU TO
                  ARBITRATE DISPUTES WITH THE COMPANY AND LIMITS THE MANNER IN WHICH YOU CAN SEEK RELIEF FROM THE
                  COMPANY.
                </u>
              </h3>
              <p>
                9.1 <u>Applicability of Arbitration</u>. You agree that any dispute between you and the Company Entities
                arising out of or relating to the Services or these Terms will be resolved by BINDING ARBITRATION,
                RATHER THAN IN COURT, except that you and the Company may assert claims in small claims court if the
                claims qualify, remain in such court, and advance solely on an individual, non-class basis.
              </p>
              <p>
                9.2 <u>Arbitration Rules and Forum</u>. These Terms evidence a transaction in interstate commerce, and
                the Federal Arbitration Act, 9 U.S.C. § 1, et seq., governs the interpretation and enforcement of this
                Section 9. The arbitration will be conducted by JAMS, an established alternative dispute resolution
                provider. Disputes where no disputed claim or counterclaim exceeds $250,000, not including interest or
                attorneys’ fees, will be subject to JAMS’ Streamlined Arbitration Rules and Procedures; all other claims
                will be subject to JAMS’ Comprehensive Arbitration Rules and Procedures. JAMS’ rules are available at
                www.jamsadr.com or by calling JAMS at (800) 352-5267. The JAMS Consumer Arbitration Minimum Standards,
                effective July 15, 2009, is available at{' '}
                <a href="https://www.jamsadr.com/consumer-minimum-standards/" target="_blank" rel="noopener noreferrer">
                  https://www.jamsadr.com/consumer-minimum-standards/
                </a>
                . Any required arbitration hearing may be conducted, at your option, (a) in New York, New York; (b) if
                you prefer a hearing in or closer to your hometown area, at a reasonable alternative location you and
                the Company identify upon conferring in good faith; or (c) by telephone or video conference. The
                arbitration shall be conducted in English. The Company will pay arbitration costs as required by the
                JAMS Consumer Arbitration Minimum Standards. Specifically, if you initiate arbitration, you will pay
                $250 of the arbitration costs, and the Company will pay the remainder. If the Company initiates the
                arbitration, the Company will pay all arbitration costs.
              </p>
              <p>
                9.3 <u>Authority of Arbitrator</u>. The arbitration shall be conducted by one neutral arbitrator
                appointed in accordance with the applicable JAMS rules. Except for disputes over whether the exception
                in Section 9.1 applies, which shall be resolved by the court in which such action has been brought, all
                other disputes over arbitrability shall be resolved by the arbitrator. The arbitrator will decide the
                rights and liabilities, if any, of you and the Company. The arbitrator will have the authority to grant
                motions dispositive of all or part of any claim or dispute. The arbitrator will have the authority to
                award monetary damages and to grant any non-monetary remedy or relief available to an individual party
                under applicable law, the arbitral forum’s rules, and these Terms. The arbitrator will issue a written
                award and statement of decision describing the essential findings and conclusions on which any award (or
                decision not to render an award) is based, including the calculation of any damages awarded. The
                arbitrator will follow the applicable law. The arbitrator has the same authority to award relief on an
                individual basis that a judge in a court of law would have. The award of the arbitrator is final and
                binding upon you and the Company.
              </p>
              <p>
                9.4 <u>Waiver of Jury Trial</u>. YOU AND THE COMPANY HEREBY WAIVE ANY CONSTITUTIONAL AND STATUTORY
                RIGHTS TO SUE IN COURT (OTHER THAN IN SMALL CLAIMS COURT, AS PERMITTED IN THESE TERMS) AND HAVE A TRIAL
                IN FRONT OF A JUDGE OR A JURY. You and the Company are instead electing that ALL COVERED CLAIMS AND
                DISPUTES WILL BE RESOLVED BY ARBITRATION IN ACCORDANCE WITH THESE TERMS, except as specified above in
                Section 9.1. An arbitrator can award, on an individual basis, the same damages and relief as a court and
                must follow these Terms as a court would. However, THERE IS NO JUDGE OR JURY IN ARBITRATION, AND COURT
                REVIEW OF AN ARBITRATION AWARD IS VERY LIMITED. BOTH YOU AND THE COMPANY KNOWINGLY WAIVE ANY RIGHTS
                EITHER OF THE PARTIES MAY HAVE TO A TRIAL BY JURY FOR ANY DISPUTE ARISING OUT OF OR RELATED TO THE
                SERVICES OR THESE TERMS.
              </p>
              <p>
                9.5 <u>Waiver of Class or Other Non-Individualized Relief</u>. ALL CLAIMS AND DISPUTES WITHIN THE SCOPE
                OF THIS ARBITRATION AGREEMENT MUST BE ARBITRATED ON AN INDIVIDUAL BASIS AND NOT ON A CLASS,
                CONSOLIDATED, REPRESENTATIVE, OR COLLECTIVE BASIS; ONLY INDIVIDUAL RELIEF IS AVAILABLE FOR CLAIMS
                COVERED BY THIS ARBITRATION AGREEMENT; AND CLAIMS OF MORE THAN ONE CUSTOMER CANNOT BE ARBITRATED OR
                CONSOLIDATED WITH THOSE OF ANY OTHER CUSTOMER OR PERSON. If a decision is issued stating that applicable
                law precludes enforcement of any of this Section 9’s limitations as to a given claim for relief, then
                the applicable claim must be severed from the arbitration and brought into the state or federal courts
                in accordance with the last sentence of Section 10.6 of these Terms. All other claims will be
                arbitrated.
              </p>
              <p>
                9.6 <u>30-Day Right to Opt Out; Modification</u>. You have the right to opt out of the provisions of
                this Section 9 by sending a timely written notice of your decision to opt out to the following address:
                Feather Home Inc., 459 Broadway, Fifth Floor, New York, New York 10013, Attn: Legal or email to
                hello@livefeather.com, within 30 days after agreeing to these Terms. Your notice must include your name
                and address and a clear statement that you want to opt out of this Section 9 of these Terms. If you opt
                out of this Section 9, all other parts of these Terms will continue to apply to you. Opting out of this
                Section 9 has no effect on any other arbitration agreements that you may currently have with the
                Company, or may enter into in the future with the Company. Notwithstanding any provision in these Terms
                to the contrary, if the Company makes any future material change to this Section 9, you may reject that
                change within 30 days of such change becoming effective by writing the Company at the following address:
                Feather Home Inc., 459 Broadway, Fifth Floor, New York, New York 10013, Attn: Legal.
              </p>
              <p>
                9.7 <u>Other Remedies</u>. The provisions of this Section 9 do not prohibit you or the Company from
                exercising any lawful rights or using other available remedies to preserve, or obtain possession of
                property; exercise self-help remedies; or for California residents only, to obtain provisional or
                ancillary remedies such as injunctive relief.
              </p>

              <h3>10. ADDITIONAL PROVISIONS</h3>
              <p>
                10.1 <u>SMS Messaging and Phone Calls</u>. Certain portions of the Services may allow us to contact you
                via telephone or text messages. You agree that the Company may contact you via telephone or text
                messages (including by an automatic telephone dialing system) at any of the phone numbers provided by
                you or on your behalf in connection with your use of the Services, including for marketing purposes. You
                understand that you are not required to provide this consent as a condition of leasing any Furniture
                Items. You also understand that you may opt out of receiving marketing text messages from us at any time
                by texting the word “STOP” to the sender phone number using the mobile device that is receiving the
                messages. If you do not choose to opt out, we may contact you as outlined in our Privacy Policy.
              </p>

              <p>
                10.2 <u>Updating These Terms</u>. We may modify these Terms from time to time in which case we will
                update the “Last Revised” date at the top of these Terms. If we make changes that are material, we will
                use reasonable efforts to attempt to notify you, such as by e-mail and/or by placing a prominent notice
                on the first page of the Website. However, it is your sole responsibility to review these Terms from
                time to time to view any such changes. The updated Terms will be effective as of the time of posting, or
                such later date as may be specified in the updated Terms. Your continued access to or use of the
                Services after the modifications have become effective will be deemed your acceptance of the modified
                Terms.
              </p>

              <p>
                10.3 <u>Termination of License and Your Account</u>. If you breach any of the provisions of these Terms,
                all licenses granted by the Company will terminate automatically. Additionally, the Company may suspend,
                disable, or delete your Account and/or the Services (or any part of the foregoing) with or without
                notice, for any or no reason. If the Company deletes your Account for any suspected breach of these
                Terms by you, you are prohibited from re-registering for the Services under a different name. All
                sections which by their nature should survive the termination of these Terms, including but not limited
                to Section 9, shall continue in full force and effect subsequent to and notwithstanding any termination
                of these Terms by the Company or you. Termination will not limit any of the Company’s other rights or
                remedies at law or in equity.
              </p>

              <p>
                10.4 <u>Injunctive Relief</u>. You agree that a breach of these Terms will cause irreparable injury to
                the Company for which monetary damages would not be an adequate remedy and the Company shall be entitled
                to equitable relief in addition to any remedies it may have hereunder or at law without a bond, other
                security or proof of damages.
              </p>

              <p>
                10.5 <u>California Residents</u>. If you are a California resident, in accordance with Cal. Civ. Code §
                1789.3, you may report complaints to the Complaint Assistance Unit of the Division of Consumer Services
                of the California Department of Consumer Affairs by contacting them in writing at 1625 North Market
                Blvd., Suite N 112 Sacramento, CA 95834, or by telephone at (800) 952-5210.
              </p>

              <p>
                10.6 <u>Miscellaneous</u>. If any provision of these Terms shall be unlawful, void or for any reason
                unenforceable, then that provision shall be deemed severable from these Terms and shall not affect the
                validity and enforceability of any remaining provisions. These Terms and the licenses granted hereunder
                may be assigned by the Company but may not be assigned by you without the prior express written consent
                of the Company. No waiver by either party of any breach or default hereunder shall be deemed to be a
                waiver of any preceding or subsequent breach or default. The section headings used herein are for
                reference only and shall not be read to have any legal effect. The Services are operated by us in the
                United States. Those who choose to access the Services from locations outside the United States do so at
                their own initiative and are responsible for compliance with applicable local laws. These Terms and any
                dispute arising out of or relating to the Services or these Terms are governed by and will be construed
                in accordance with the laws of the State of New York, without regard to conflict or choice of law
                provisions. Other than proceedings in small claims court if the claims qualify, remain in such court,
                and advance solely on an individual, non-class basis, you and the Company agree the state or federal
                courts of New York County, New York will be the jurisdiction and legal venue for any court proceedings
                arising out of or relating to the Services or these Terms. Arbitration awards may be entered in any
                court of competent jurisdiction.
              </p>

              <p>
                10.7 <u>How to Contact Us</u>. You may contact us regarding the Services or these Terms at: 459
                Broadway, Fifth Floor, New York, New York 10013, or on our website at{' '}
                <a href="https://www.livefeather.com/contact" target="_blank" rel="noopener noreferrer">
                  https://www.livefeather.com/contact
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default TermsAndConditions;
