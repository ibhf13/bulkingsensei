export default (req, res, next) => {
  const userId = req.header("User-Id");
  console.log("Received User-Id:", userId);

  if (!userId) {
    return res.status(401).json({ msg: "No user ID, authorization denied" });
  }

  try {
    // For now, we're just attaching the userId to the request
    req.userId = userId;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(401).json({ msg: "User ID is not valid" });
  }
};
