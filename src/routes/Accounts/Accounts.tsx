import { useEffect } from "react";
import { Table } from "../../components";
import { useState } from "react";
import { ITableOutputData } from "../../components/Table/types.ts";
import {useNavigate} from "react-router-dom";

const Accounts = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<ITableOutputData | null>(null);

  useEffect(() => {
    (
      async () => {
        const response = await fetch(`${document.location.origin}/static/accounts.json`);
        const data = await response.json()
        setAccounts(data);
      }
    )()
  }, []);

  const onNavigate = (accountId: string) => {
    navigate(`/profile/${accountId}`)
  }

  return (
    <>
      <h1>Accounts</h1>
      {accounts && (
        <Table outputData={accounts} navigate={onNavigate} />
      )}
    </>
  )
}

export default Accounts;
