import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import React from "react";

const TermsOfServices = () => {
  return (
    <SoftBox>
      <SoftTypography variant="h1">Website Terms and Conditions of Use</SoftTypography>

      <SoftTypography variant="subtitle1" mt={0.4}>
        1. Terms
      </SoftTypography>

      <SoftTypography variant="body2">
        By accessing this Website, accessible from https://calcularg.onrender.com/, you are agreeing
        to be bound by these Website Terms and Conditions of Use and agree that you are responsible
        for the agreement with any applicable local laws. If you disagree with any of these terms,
        you are prohibited from accessing this site. The materials contained in this Website are
        protected by copyright and trade mark law.
      </SoftTypography>

      <SoftTypography variant="subtitle1 mt={1}">2. Use License</SoftTypography>

      <SoftTypography variant="body2">
        Permission is granted to temporarily download one copy of the materials on Calcularg&lsquo;s
        Website for personal, non-commercial transitory viewing only. This is the grant of a
        license, not a transfer of title, and under this license you may not:
      </SoftTypography>

      <ul style={{ paddingLeft: "1rem" }}>
        <li>
          <SoftTypography variant="body2" mt={0.5}>
            modify or copy the materials;
          </SoftTypography>
        </li>
        <li>
          <SoftTypography variant="body2" mt={0.5}>
            use the materials for any commercial purpose or for any public display;
          </SoftTypography>
        </li>
        <li>
          <SoftTypography variant="body2" mt={0.5}>
            attempt to reverse engineer any software contained on Calcularg&lsquo;s Website;
          </SoftTypography>
        </li>
        <li>
          <SoftTypography variant="body2" mt={0.5}>
            remove any copyright or other proprietary notations from the materials; or
          </SoftTypography>
        </li>
        <li>
          <SoftTypography variant="body2" mt={0.5}>
            transferring the materials to another person or &#34;mirror&#34; the materials on any
            other server.
          </SoftTypography>
        </li>
      </ul>

      <SoftTypography variant="body2" mt={1}>
        This will let Calcularg to terminate upon violations of any of these restrictions. Upon
        termination, your viewing right will also be terminated and you should destroy any
        downloaded materials in your possession whether it is printed or electronic format. These
        Terms of Service has been created with the help of the{" "}
        <a href="https://www.termsofservicegenerator.net">Terms Of Service Generator</a>.
      </SoftTypography>

      <SoftTypography variant="subtitle1" mt={0.4}>
        3. Disclaimer
      </SoftTypography>

      <SoftTypography variant="body2">
        All the materials on Calcularg&lsquo;s Website are provided &quot;as is&quot;. Calcularg
        makes no warranties, may it be expressed or implied, therefore negates all other warranties.
        Furthermore, Calcularg does not make any representations concerning the accuracy or
        reliability of the use of the materials on its Website or otherwise relating to such
        materials or any sites linked to this Website.
      </SoftTypography>

      <SoftTypography variant="subtitle1" mt={0.4}>
        4. Limitations
      </SoftTypography>

      <SoftTypography variant="body2">
        Calcularg or its suppliers will not be hold accountable for any damages that will arise with
        the use or inability to use the materials on Calcularg&lsquo;s Website, even if Calcularg or
        an authorize representative of this Website has been notified, orally or written, of the
        possibility of such damage. Some jurisdiction does not allow limitations on implied
        warranties or limitations of liability for incidental damages, these limitations may not
        apply to you.
      </SoftTypography>

      <SoftTypography variant="subtitle1" mt={0.4}>
        5. Revisions and Errata
      </SoftTypography>

      <SoftTypography variant="body2">
        The materials appearing on Calcularg&lsquo;s Website may include technical, typographical,
        or photographic errors. Calcularg will not promise that any of the materials in this Website
        are accurate, complete, or current. Calcularg may change the materials contained on its
        Website at any time without notice. Calcularg does not make any commitment to update the
        materials.
      </SoftTypography>

      <SoftTypography variant="subtitle1" mt={0.4}>
        6. Links
      </SoftTypography>

      <SoftTypography variant="body2">
        Calcularg has not reviewed all of the sites linked to its Website and is not responsible for
        the contents of any such linked site. The presence of any link does not imply endorsement by
        Calcularg of the site. The use of any linked website is at the user&lsquo;s own risk.
      </SoftTypography>

      <SoftTypography variant="subtitle1" mt={0.4}>
        7. Site Terms of Use Modifications
      </SoftTypography>

      <SoftTypography variant="body2">
        Calcularg may revise these Terms of Use for its Website at any time without prior notice. By
        using this Website, you are agreeing to be bound by the current version of these Terms and
        Conditions of Use.
      </SoftTypography>

      <SoftTypography variant="subtitle1" mt={0.4}>
        8. Your Privacy
      </SoftTypography>

      <SoftTypography variant="body2">Please read our Privacy Policy.</SoftTypography>

      <SoftTypography variant="subtitle1" mt={0.4}>
        9. Governing Law
      </SoftTypography>

      <SoftTypography variant="body2">
        Any claim related to Calcularg&lsquo;s Website shall be governed by the laws of ar without
        regards to its conflict of law provisions.
      </SoftTypography>
    </SoftBox>
  );
};

export default TermsOfServices;
