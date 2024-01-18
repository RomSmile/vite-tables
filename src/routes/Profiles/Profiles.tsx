import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ITableOutputData } from "../../components/Table/types.ts";
import {Table} from "../../components";
import Header from "../../components/Header";

const Profiles = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const [profiles, setProfiles] = useState<ITableOutputData | null>(null);

  useEffect(() => {
    (
      async () => {
        const response = await fetch(`${document.location.origin}/static/profiles/${accountId}/index.json`);
        const data = await response.json()
        setProfiles(data);
      }
    )()
  }, []);

  const onNavigate = (profileId: string) => {
    navigate(`/campaign/${profileId}`)
  }

  return (
    <>
      <Header />
      <h1>Profiles {accountId}</h1>
      {profiles && (
        <Table outputData={profiles} navigate={onNavigate} />
      )}
    </>
  )
}

export default Profiles;