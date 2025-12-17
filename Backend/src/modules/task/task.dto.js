exports.createTaskDto = (data) => {
  if (!data.title || !data.assignedToId) {
    throw new Error("Missing required fields");
  }
  return data;
};
