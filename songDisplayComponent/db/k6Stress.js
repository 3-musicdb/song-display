import http from "k6/http";
import { sleep } from "k6";

export default function() {
  http.get("http://localhost:5001/getSong/8348300");
};

// export default function() {
//   http.post("http://localhost:5001/postComment/");
// };