function makeFriendsList(friends) {
  let ul = document.createElement("UL");
  for (let item of friends) {
    let li = document.createElement("LI");
    li.innerHTML = `${item.firstName} ${item.lastName}`;
    ul.append(li);
  }
  return ul;
}
