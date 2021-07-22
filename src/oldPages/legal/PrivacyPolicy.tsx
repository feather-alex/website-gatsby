import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../app/Layout";
import Helmet from "../../components/Helmet";
import { SplashPage } from "./SplashPage";
import Analytics from "../../analytics/analytics";
import PAGES from "../../analytics/pages";

class PrivacyPolicy extends React.Component {
  componentDidMount() {
    Analytics.trackPage(PAGES.PRIVACY);
  }
  render() {
    const title = "Privacy Policy";
    const description = "Your privacy is important to Feather";
    const image =
      "https://img.livefeather.com/pages-new/About/Wall.png?auto=compress&sat=45&q=65&sharp=10&fm=jpg&w=600";

    return (
      <Layout>
        <div className="utility-page body">
          <Helmet title={title} description={description} imageUrl={image} />
          <SplashPage
            image="https://img.livefeather.com/pages-new/About/Wall.png?auto=compress&sat=45&q=15&sharp=10&fm=jpg"
            title="Privacy policy"
          />
          <div className="utility-page-body">
            <div className="section-container">
              <p>Last Revised on 01/27/21</p>
              <h2>Introduction and Overview</h2>
              <p>
                This Privacy Policy describes how Feather Home Inc. (
                <strong>“Company,”</strong> <strong>“we,”</strong>
                <strong>“our,”</strong> or <strong>“us”</strong>) collects,
                uses, and shares information about you as well as your rights
                and choices about such use and sharing, and applies to your use
                of any online service location that posts a link to this Privacy
                Policy and all features, content, and other services that we
                own, control, and make available through such online service
                location (collectively, the <strong>“Service”</strong>). This
                Privacy Policy does not apply to our information collection
                activities outside of the Service (unless otherwise stated below
                or at the time of collection). By using the Service, you agree
                to our <Link to="/terms-and-conditions">Terms of Use</Link> and
                to our collection, use and disclosure practices, and other
                activities as described in this Privacy Policy. If you do not
                agree and consent, discontinue use of the Service.
              </p>
              <p>
                If you have any questions about our privacy practices, please
                contact us as set forth in the section entitled “Contact Us”
                below.
              </p>

              <h2>Information Collection</h2>
              <h3>1. Information You Provide</h3>
              <p>
                We collect information you provide directly via the Service,
                such as when you register an account, update your profile,
                access our content, make a purchase, or participate in a
                promotion, contact customer support, or apply for a job. We may
                use Service Providers (defined below) to collect this
                information.
              </p>
              <p>
                The information we collect includes information that identifies
                you personally (whether alone or in combination). Some examples
                of information we collect include the following:
              </p>
              <ul>
                <li>
                  <strong>Contact Data.</strong> We collect your first and last
                  name, e-mail address, postal address, phone number, and other
                  similar contact data. This includes the address for the
                  delivery of any furniture or other products related to our
                  services.
                </li>
                <li>
                  <strong>Payment Data.</strong> We collect data necessary to
                  process your payment if you make a purchase, such as your
                  payment instrument number (such as a credit card number), and
                  the security code associated with your payment instrument.
                </li>
                <li>
                  <strong>Content.</strong> We collect the content of messages
                  you send to us, such as feedback and product reviews you
                  write, or questions and information you provide to customer
                  support. We also collect the content of your communications as
                  necessary to provide you with the services you use.
                </li>
              </ul>
              <p>
                You may choose to voluntarily submit other information to us
                through the Service that we do not request, and, in such
                instances, you are solely responsible for such information.
              </p>

              <h3>2. Information Collected Automatically</h3>
              <p>
                We automatically collect information about your device and how
                your device interacts with our Service. We may use Service
                Providers to collect this information. Some examples of
                information we collect include the following:
              </p>
              <ul>
                <li>
                  <strong>Service Use Data.</strong> We collect data about the
                  features you use, the pages you visit, the e-mails and
                  advertisements you view, the products you purchase, the time
                  of day you browse, your referring and exiting pages, and other
                  similar information.
                </li>
                <li>
                  <strong>Device Connectivity and Configuration Data.</strong>{" "}
                  We collect data about the type of device or browser you use,
                  your device’s operating software, your internet service
                  provider, your device’s regional and language settings, and
                  other similar information. This data also includes IP address,
                  MAC address, device advertising Id (e.g., IDFA or AAID), and
                  other device identifiers.
                </li>
              </ul>

              <p>
                We use various current – and later – developed technologies to
                collect this information (“Tracking Technologies”), including
                the following:
              </p>
              <ul>
                <li>
                  <strong>Log Files</strong>. A log file is a file that records
                  events that occur in connection with your use of the Service,
                  such as your service use data.
                </li>
                <li>
                  <strong>Cookies</strong>. A cookie is a small data file stored
                  on your device that acts as a unique tag to identify your
                  browser. We use two types of cookies: session cookies and
                  persistent cookies. Session cookies make it easier for you to
                  navigate the Service and expire when you close your browser.
                  Persistent cookies help with personalizing your experience,
                  remembering your preferences, and supporting security
                  features. Additionally, persistent cookies allow us to bring
                  you advertising both on and off the Service. Persistent
                  cookies may remain on your device for extended periods of
                  time, and generally may be controlled through your browser
                  settings.
                </li>
                <li>
                  <strong>Advertising Technology</strong>. We may use certain
                  advertising analytics technology, like that provided by Google
                  to analyze your use of the Services or advertising that was
                  displayed to you.
                </li>
              </ul>

              <p>
                Some information about your use of the Service and certain Third
                Party Services (defined below) may be collected using Tracking
                Technologies across time and services and used by us and third
                parties for purposes such as to associate different devices you
                use, and deliver relevant ads and/or other content to you on the
                Service and certain Third Party Services.
              </p>

              <h3>3. Other Sources of Information</h3>
              <p>
                We may receive information about you from credit check vendors
                who we use to conduct such screenings. We will use such
                information in accordance with this Privacy Policy.
              </p>

              <h2>Use of Information</h2>
              <p>
                We use information about you for our legitimate interests,
                including to:
              </p>
              <ul>
                <li>
                  Manage our Service, including your registration and online or
                  offline account.
                </li>
                <li>
                  Perform services requested by you, such as to respond to your
                  comments, questions, and requests, and provide customer
                  service.
                </li>
                <li>
                  Send you technical notices, updates, security alerts,
                  information regarding changes to our policies, and support and
                  administrative messages.
                </li>
                <li>
                  Prevent and address fraud, breach of policies or terms, and
                  threats or harm.
                </li>
                <li>
                  Determine your eligibility for furniture subscriptions,
                  including conducting credit checks and other screening
                  processes to the extent allowed under applicable laws.
                </li>
                <li>Monitor and analyse trends, usage, and activities.</li>
                <li>Conduct research, including focus groups and surveys.</li>
                <li>
                  Improve the Service or other Company websites, apps, marketing
                  efforts, products and services.
                </li>
              </ul>

              <p>
                We may use information that does not identify you (including
                information that has been de-identified) without obligation to
                you except as prohibited by applicable law. For information on
                your rights and choices regarding how we use your information,
                please see the section entitled “Your Rights and Choices” below.
              </p>

              <h2>Sharing of Information</h2>
              <p>We share information about you as follows:</p>

              <ul>
                <li>
                  <strong>Service Providers.</strong> We may share your
                  information with our agents, vendors, and other service
                  providers (collectively{" "}
                  <strong>{'"Service Providers"'}</strong>) in connection with
                  their work on our behalf. Service Providers assist us with
                  services such as payment processing, credit checks, data
                  analytics, marketing and promotional services, Promotions,
                  website hosting, and technical support. Service Providers are
                  prohibited from using your information for any purpose other
                  than to provide this assistance, although we may permit them
                  to use aggregate information which does not identify you or
                  de-identified data for other purposes.
                </li>
                <li>
                  <strong>Affiliates.</strong> We may share your information
                  with our related entities including our parent and sister
                  companies. For example, we may share your information with our
                  affiliates for customer support, marketing, and technical
                  operations.
                </li>
                <li>
                  <strong>Business Partners.</strong> We may share your
                  information with our business partners in connection with
                  offering you co-branded services, selling or distributing our
                  products, or engaging in joint marketing activities. For
                  example, we may share information about you with a retailer
                  for purposes of providing you with product support.
                </li>
                <li>
                  <strong>Third Parties.</strong> We may share your information
                  with third parties for purposes of facilitating your requests
                  (such as when you choose to share information with a social
                  network about your activities on the Service) and in
                  connection with tailoring advertisements, measuring and
                  improving our Service and advertising effectiveness, and
                  enabling other enhancements.
                </li>
                <li>
                  <strong>Merger or Acquisition.</strong> We may share your
                  information in connection with, or during negotiations of, any
                  proposed or actual merger, purchase, sale or any other type of
                  acquisition or business combination of all or any portion of
                  our assets, or transfer of all or a portion of our business to
                  another business.
                </li>
                <li>
                  <strong>Security and Compelled Disclosure.</strong> We may
                  share your information to comply with the law or other legal
                  process, and where required, in response to lawful requests by
                  public authorities, including to meet national security or law
                  enforcement requirements. We may also share your information
                  to protect the rights, property, life, health, security and
                  safety of us, the Service or any third party.
                </li>
                <li>
                  <strong>Consent.</strong> We may share your information for
                  any other purpose disclosed to you and with your consent.
                </li>
              </ul>

              <p>
                Without limiting the foregoing, in our sole discretion, we may
                share aggregated information which does not identify you or
                de-identified information about you with third parties or
                affiliates for any purpose except as prohibited by applicable
                law. For information on your rights and choices regarding how we
                share your information, please see the section entitled “Your
                Rights and Choices” below.
              </p>

              <h2>Your Rights and Choices</h2>
              <h3>1. Review and Update of Account Information</h3>
              <p>
                You may access, update, or remove certain account information
                that you have voluntarily submitted to us through the Service by
                sending an e-mail to the e-mail address set forth in the section
                entitled “Contact Us” below. We may require additional
                information from you to allow us to confirm your identity.
                Please note that we will retain and use your information as
                necessary to comply with our legal obligations, resolve
                disputes, and enforce our agreements. California residents have
                additional rights as set forth in the sections entitled “Your
                California Privacy Rights.”
              </p>
              <p>
                These additional disclosures are required by the California
                Consumer Privacy Act and are effective as of January 24, 2020.
              </p>
              <p>
                Categories of personal information collected. The personal
                information that we may collect, or may have collected from
                consumers in the preceding twelve months, fall into the
                following categories established by the California Consumer
                Privacy Act, depending on how you engage with the Feather:
              </p>
              <ul>
                <li>
                  Identifiers, such as your name, alias, address, phone numbers,
                  or IP address;
                </li>
                <li>
                  Personal information as described in subdivision (e) of
                  Section 1798.80 of the California Civil Code, such as a credit
                  card number;
                </li>
                <li>
                  Characteristics of protected classifications under California
                  or US federal law, such as age or gender, for example if we
                  conduct user surveys or analysis;
                </li>
                <li>
                  Internet or other electronic network activity information,
                  including content interaction information, such as content
                  downloads.
                </li>
                <li>
                  Geolocation data, such as the location of your device or
                  computer.
                </li>
                <li>
                  Audio, visual, electronic or other similar information,
                  including when you communicate with us by phone or otherwise;
                </li>
                <li>
                  Professional or employment-related information, for example
                  data you may provide about your employer(s);
                </li>
                <li>
                  Inference data, such as information about your preferences;
                  and
                </li>
              </ul>
              <p>
                Categories of personal information disclosed for a business
                purpose. The personal information that we may have disclosed
                about consumers for a business purpose in the preceding twelve
                months fall into the following categories established by the
                California Consumer Privacy Act, depending on how you engage
                with the Feather:
              </p>
              <ul>
                <li>
                  Identifiers, such as your name, address, or phone numbers, for
                  example if we use a third party to perform delivery of
                  furniture;
                </li>
                <li>
                  Personal information as described in subdivision (e) of
                  Section 1798.80 of the California Civil Code, such as a credit
                  card number, for example if we use a third-party payment
                  processor;
                </li>
                <li>
                  Your age, gender, or other protected classifications under
                  California or US federal law, for example if we conduct user
                  surveys or analysis using a third-party service provider;
                </li>
                <li>
                  Internet or other electronic network activity information,
                  such as if we use a third-party service provider to help us
                  gather reports for analyzing the health of our devices and
                  services;
                </li>
                <li>
                  Geolocation data for your device or computer, for example if
                  we need to monitor or confirm that your payments or purchases;
                </li>
                <li>
                  Audio, visual, electronic or other similar information, for
                  example if a third-party service provider reviews recordings
                  of customer support phone calls for quality assurance purposes
                  and;
                </li>
                <li>
                  Professional or employment-related information, for example if
                  we provide information to a third-party service provider for
                  verification.
                </li>
              </ul>
              <p>
                We may share each of these categories of personal information
                with the entities listed in the Sharing of Information section
                of the policy above.
              </p>
              <p>
                Your Rights. You may have the right under the California
                Consumer Privacy Act to request information about the collection
                of your personal information by us, or access or deletion of
                your personal information. If you wish to do any of these
                things, please contact your Feather Account Manager through your
                Feather account at livefeather.com. Depending on your data
                choices, certain services may be limited or unavailable.
              </p>

              <h3>2. Tracking Technology Choices</h3>
              <p>
                <strong>Cookies and Pixels.</strong> Most browsers accept
                cookies by default. You can instruct your browser, by changing
                its settings, to decline or delete cookies. If you use multiple
                browsers on your device, you will need to instruct each browser
                separately. Your ability to limit cookies is subject to your
                browser settings and limitations.
              </p>
              <p>
                <strong>Do Not Track.</strong> Your browser settings may allow
                you to automatically transmit a “Do Not Track” signal to online
                services you visit. Note, however, there is no industry
                consensus as to what site and app operators should do with
                regard to these signals. Accordingly, we do not monitor or take
                action with respect to “Do Not Track” signals or other
                mechanisms. For more information on “Do Not Track,” visit&nbsp;
                <a
                  href="http://www.allaboutdnt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  http://www.allaboutdnt.com
                </a>
                .
              </p>
              <p>
                Please be aware that if you disable or remove Tracking
                Technologies some parts of the Service may not function
                correctly.
              </p>

              <h3>3. Communications</h3>
              <p>
                <strong>E-mails.</strong> You can opt-out of receiving
                promotional e-mails from us at any time by following the
                instructions as provided in e-mails to click on the unsubscribe
                link, or e-mailing us at the e-mail address set forth in the
                section entitled “Contact Us” below with the word UNSUBSCRIBE in
                the subject field of the e-mail. Please note that you cannot
                opt-out of non-promotional e-mails, such as those about your
                account, transactions, servicing, or Company’s ongoing business
                relations.
              </p>

              <h3>Your California Privacy Rights</h3>
              <p>
                California’s “Shine the Light” law permits customers in
                California to request certain details about how certain types of
                their information are shared with third parties and, in some
                cases, affiliates, for those third parties’ and affiliates’ own
                direct marketing purposes. Under the law, a business should
                either provide California customers certain information upon
                request or permit California customers to opt in to, or opt out
                of, this type of sharing.
              </p>
              <p>
                Company may share personal information as defined by
                California’s <strong>“Shine the Light”</strong> law with third
                parties and/or affiliates for such third parties’ and
                affiliates’ own direct marketing purposes. If you are a
                California resident and wish to obtain information about our
                compliance with this law, please contact us as set forth in the
                section entitled “Contact Us” below. Requests must include
                “California Privacy Rights Request” in the first line of the
                description and include your name, street address, city, state,
                and ZIP code. Please note that Company is not required to
                respond to requests made by means other than through the
                provided e-mail address or mail address.
              </p>
              <p>
                Any California residents under the age of eighteen (18) who have
                registered to use the Service and posted content or information
                on the Service, can request that such information be removed
                from the Service by sending an e-mail to the e-mail address set
                forth in the section entitled “Contact Us” below. Requests must
                state that the user personally posted such content or
                information and detail where the content or information is
                posted. We will make reasonable good faith efforts to remove the
                post from prospective public view.
              </p>

              <h2>Children</h2>
              <p>
                The Service is intended for a general audience and not directed
                to children under thirteen (13) years of age. Company does not
                knowingly collect personal information as defined by the U.S.
                Children’s Privacy Protection Act (<strong>“COPPA”</strong>) in
                a manner that is not permitted by COPPA. If you are a parent or
                guardian and believe Company has collected such information in a
                manner not permitted by COPPA, please contact us as set forth in
                the section entitled “Contact Us” below, and we will remove such
                data to the extent required by COPPA.
              </p>

              <h2>Data Security</h2>
              <p>
                We implement and maintain reasonable administrative, physical,
                and technical security safeguards to help protect your
                information from loss, theft, misuse and unauthorized access,
                disclosure, alteration and destruction. Nevertheless,
                transmission via the internet is not completely secure and we
                cannot guarantee the security of your information.
              </p>

              <h2>Changes to this Privacy Policy</h2>
              <p>
                We reserve the right to revise and reissue this Privacy Policy
                at any time. Any changes will be effective immediately upon
                posting of the revised Privacy Policy and updating the
                “Effective Date” above. We will make reasonable efforts to post
                and contact you for material changes to the policy. Your
                continued use of our Service indicates your consent to the
                Privacy Policy then posted. If the changes are material, we may
                provide you additional notice to your e-mail address.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions or comments about this Privacy Policy,
                our data practices, or our compliance with applicable law,
                please contact us:
              </p>
              <p style={{ marginTop: 0 }}>
                By email:{" "}
                <a href="mailto:hello@livefeather.com">hello@livefeather.com</a>
              </p>
              <p style={{ marginTop: 0 }}>
                By mail: 459 Broadway, Floor 5, New York, NY 10013
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default PrivacyPolicy;
