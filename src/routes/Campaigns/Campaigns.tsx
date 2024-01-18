import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ITableOutputData } from "../../components/Table/types.ts";
import { Table } from "../../components";
import Header from "../../components/Header";

const Campaigns = () => {
  const { profileId} = useParams();
  const [campaigns, setCampaigns] = useState<ITableOutputData | null>(null);

  useEffect(() => {
    (
      async () => {
        const response = await fetch(`${document.location.origin}/static/profiles/${profileId}/campaigns/index.json`);
        const data = await response.json()

        setCampaigns(data);
      }
    )()
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onNavigate = (_accountId: string) => {
    return;
  }
  return (
    <>
      <Header />
      <h1>
        Campaigns {profileId}
      </h1>

      {campaigns && (
        <Table outputData={campaigns} navigate={onNavigate}/>
      )}
    </>
  );
};

export default Campaigns;
