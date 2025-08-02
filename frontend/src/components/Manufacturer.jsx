import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  MANUFACTURER_QUERY as MANUFACTURER_BY_ID,
  CREATE_MANUFACTURER,
  UPDATE_MANUFACTURER,
  DELETE_MANUFACTURER,
} from "../graphql/manufacturers.js";

function Manufacturer() {
  const { id } = useParams();
  const manuID = parseInt(id, 10);
  const navigate = useNavigate();

  // 1) Fetch this manufacturer
  const { data, loading, error, refetch } = useQuery(MANUFACTURER_BY_ID, {
    variables: { manuID },
    fetchPolicy: "network-only",
  });

  const [createManufacturer] = useMutation(CREATE_MANUFACTURER, {
    onCompleted: () => {
      setNewName("");
      alert("Manufacturer created.");
      refetch(); 
    },
    onError: (err) => alert(err.message),
  });
  const [updateManufacturer] = useMutation(UPDATE_MANUFACTURER, {
    onCompleted: () => {
      alert("Manufacturer updated.");
      refetch();
    },
    onError: (err) => alert(err.message),
  });
  const [deleteManufacturer] = useMutation(DELETE_MANUFACTURER, {
    onCompleted: () => {
      alert("Manufacturer deleted.");
      navigate("/manufacturers");
    },
    onError: (err) => alert(err.message),
  });

  const [newName, setNewName] = useState("");
  const [editName, setEditName] = useState("");

  useEffect(() => {
    if (data?.manufacturer) {
      setEditName(data.manufacturer.manuName);
    }
  }, [data]);

  const handleCreate = () => {
    if (!newName.trim()) return;
    createManufacturer({
      variables: { input: { manuName: newName } },
    });
  };

  const handleUpdate = () => {
    if (!editName.trim()) return;
    updateManufacturer({
      variables: { manuID, input: { manuName: editName } },
    });
  };

  const handleDelete = () => {
    if (window.confirm("Xác nhận xóa manufacturer này?")) {
      deleteManufacturer({ variables: { manuID } });
    }
  };

  if (loading) return "Loading...";
  if (error)   return <pre>{error.message}</pre>;

  const m = data.manufacturer;

  return (
    <div>
      <h2>
        Manufacturer #{m.manuID}: {m.manuName}
      </h2>

      {/* UPDATE form */}
      <div style={{ marginBottom: "1rem" }}>
        <h3>Cập nhật manufacturer</h3>
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
        <button onClick={handleUpdate}>Lưu thay đổi</button>
        <button onClick={handleDelete} style={{ marginLeft: "0.5rem" }}>
          Xóa manufacturer
        </button>
      </div>

      {/* CREATE new */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Tạo mới manufacturer</h3>
        <input
          type="text"
          placeholder="Tên manufacturer mới"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={handleCreate}>Tạo</button>
      </div>
    </div>
  );
}

export default Manufacturer;
