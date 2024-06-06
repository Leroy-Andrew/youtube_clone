// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   CircularProgress,
//   Alert,
// } from "@mui/material";

// const VideoComment = () => {
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch("https://youtube-v31.p.rapidapi.com"); // Replace with your API endpoint
//         const data = await response.json();
//         setComments(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchComments();
//   }, []);

//   return (
//     <Box sx={{ padding: 2, borderRadius: 1, border: "1px solid #ddd" }}>
//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center" }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <List>
//           {comments.map((comment, index) => (
//             <ListItem key={index}>
//               <ListItemText primary={comment.text} />
//             </ListItem>
//           ))}
//         </List>
//       )}
//       {error && (
//         <Alert severity="error">
//           <Typography variant="body1">{error}</Typography>
//         </Alert>
//       )}
//     </Box>
//   );
// };

// export default VideoComment;

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from "@mui/material";

const fetchFromAPI = async (url) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    throw error;
  }
};

const VideoComment = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const data = await fetchFromAPI(
          "https://youtube-v31.p.rapidapi.com/comments"
        ); // Replace with your API endpoint
        const commentsData = data.items; // Assuming the API returns an object with an "items" property containing the comments
        setComments(commentsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  return (
    <Box sx={{ padding: 2, borderRadius: 1, border: "1px solid #ddd" }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {comments.map((comment, index) => (
            <ListItem key={index}>
              <ListItemText primary={comment.text} />
            </ListItem>
          ))}
        </List>
      )}
      {error && (
        <Alert severity="error">
          <Typography variant="body1">{error}</Typography>
        </Alert>
      )}
    </Box>
  );
};

export default VideoComment;
