export function handleRfid(data, socket) {
  console.log("Controller received RFID data:", data);

  const response = `Processed RFID data: ${data}`;
  socket.emit("message", response);
}
