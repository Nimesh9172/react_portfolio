import { DataGrid } from "@mui/x-data-grid";

const rows = [
  {
    id: 1,
    col1: "Min",
    col2: "44",
    col3: "34",
    col4: "56",
    col5: "45",
  },
  {
    id: 2,
    col1: "Min",
    col2: "54",
    col3: "48",
    col4: "64",
    col5: "78",
  },
  {
    id: 3,
    col1: "Min",
    col2: "44",
    col3: "34",
    col4: "56",
    col5: "45",
  },
  {
    id: 4,
    col1: "Max",
    col2: "54",
    col3: "48",
    col4: "64",
    col5: "78",
  },
  {
    id: 5,
    col1: "Min > 0",
    col2: "44",
    col3: "34",
    col4: "56",
    col5: "45",
  },
  {
    id: 6,
    col1: "25%, Q1",
    col2: "54",
    col3: "48",
    col4: "64",
    col5: "78",
  },
  {
    id: 7,
    col1: "50% (Median)",
    col2: "44",
    col3: "34",
    col4: "56",
    col5: "45",
  },
  {
    id: 8,
    col1: "75% (Median)",
    col2: "24",
    col3: "34",
    col4: "36",
    col5: "65",
  },
  {
    id: 9,
    col1: "Max",
    col2: "84",
    col3: "94",
    col4: "46",
    col5: "75",
  },
  {
    id: 10,
    col1: "Modes (#times)",
    col2: "24",
    col3: "34",
    col4: "36",
    col5: "65",
  },
  {
    id: 11,
    col1: "Range",
    col2: "19",
    col3: "49",
    col4: "76",
    col5: "65",
  },
  {
    id: 12,
    col1: "Min-Outlier",
    col2: "84",
    col3: "94",
    col4: "46",
    col5: "75",
  },
  {
    id: 13,
    col1: "Max-Outlier",
    col2: "19",
    col3: "49",
    col4: "76",
    col5: "65",
  },
];

const columns = [
  { field: "col1", headerName: "", width: 150 },
  { field: "col2", headerName: "Real Time", width: 150 },
  { field: "col3", headerName: "Hourly", width: 150 },
  { field: "col4", headerName: "Daily", width: 150 },
  { field: "col5", headerName: "15 minutes", width: 150 },
];

const AggregationDataTable = () => {
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default AggregationDataTable;
