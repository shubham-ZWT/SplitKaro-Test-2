import { useEffect } from "react";
import groupExpenseService from "../services/groupExpense.service";

export default function ChangeGroup({
  groupIds,
  setGroupIds,
  selectedId,
  setSelectedId,
}) {
  useEffect(() => {
    const fetchGroupIds = async () => {
      const data = await groupExpenseService.getGroupId();
      setGroupIds(data?.groupIds);
      setSelectedId(data?.groupIds[0]?.id);
    };

    fetchGroupIds();
  }, [setGroupIds, setSelectedId]);

  return (
    <div className="bg-amber-100 w-fit p-2 rounded-lg flex gap-2 items-center font-semibold mt-4 mb-4 text-lg text-amber-800">
      <label htmlFor="groupId">Change Group : </label>
      <select
        className=" border border-amber-700 px-2 rounded-lg"
        name=""
        id="groupId"
        value={selectedId}
        onChange={(e) => {
          setSelectedId(Number(e.target.value));
        }}
      >
        {groupIds.map((id) => (
          <option value={id.id}>{id.name}</option>
        ))}
      </select>
    </div>
  );
}
