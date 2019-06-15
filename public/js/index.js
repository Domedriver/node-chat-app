const socket = io();

const roomSelect = document.querySelector("#room");

const handleRoomSelect = function(event) {
  if (event.target.nextSibling.nodeName === "INPUT") {
    event.target.parentNode.removeChild(event.target.nextSibling);
  }
  if (event.target.value === "newRoom") {
    const newRoom = document.createElement("input");
    newRoom.type = "text";
    newRoom.name = "room";
    newRoom.placeholder = "Room";
    newRoom.required = true;
    roomSelect.after(newRoom);
  }
};

roomSelect.addEventListener("change", handleRoomSelect);

socket.emit("roomUserInfo");

socket.on("appInfo", info => {
  Object.keys(info)
    .sort()
    .forEach(room => {
      const option = document.createElement("option");
      option.value = room;
      option.text = room + " (" + info[room] + ")";
      roomSelect.appendChild(option);
    });
});
