import { startCase } from "lodash";

import { OrgControl } from "./_components/OrgControl";
import { auth } from "@clerk/nextjs";

export function generateMetadata() {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || "Organization"),
  };
}

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
