const colorUnveiled = "#E5E9EC";
const colorDefault = "#C7CFD6";
const colorHovered = "#E5E9CD";
const mineIMG = new Image();
//mineIMG.src = "../img/mine.svg"; //if on a local server
const flagIMG = new Image();

//flagIMG.src = "../img/flag.svg"; //if on a local server

function colorSelector(zone, n) {
  /* Select the color based on the value */
  let color;

  switch (n) {
    case 0: // background color of the zone
      color = zone.getColor();
      break;
    case 1: // green
      color = "#75BF11";
      break;
    case 2: // old green
      color = "#A4C411";
      break;
    case 3: // yellow lime
      color = "#C9BD11";
      break;
    case 4: // light orange
      color = "#CF9311";
      break;
    case 5: // orange
      color = "#D46711";
      break;
    case 6: // dark orange
      color = "#DA3810";
      break;
    case 7: // red
      color = "#DF101A";
      break;
    case 8: // purple
      color = "#E5104E";
      break;
    default: // black
      color = "#202020";
      break;
  }

  return color;
}

function Zone(x, y, mine, size, value) {
  /* zone of a minesweeper board */
  this.x = x;
  this.y = y;
  this.color = colorDefault; //grey
  this.flag = false;
  this.mine = mine; //true or false
  this.size = size;
  this.value = value;
  this.isUnveiled = false;

  this.getColor = function () {
    /* Return the color of the zone */
    return this.color;
  };

  this.hover = function () {
    /* Update the color of the zone when called */
    this.color = colorHovered;
  };

  this.hasMine = function () {
    /* return true if has mine, false otherwise */
    return this.mine;
  };

  this.unveil = function () {
    /* Returns different scenario when the zone is unveiled */

    this.isUnveiled = true;
    this.color = colorUnveiled;
    this.hasMine();
  };

  this.switchFlag = function () {
    /* when called change this.flag to the opposite value, switching it on and off */
    this.flag = !this.flag;

  };

  this.draw = function (canvas) {
    /* allows the zone to print itself in a canvas */

    let ctx = canvas.getContext("2d");

    //Draw the zone background
    ctx.beginPath();
    ctx.rect(this.x, this.y, Math.floor(size), Math.floor(size));
    ctx.fillStyle = this.color;
    ctx.fill();

    if (this.isUnveiled) {
      //Draw the Text
      ctx.font = String(Math.ceil(this.size - this.size * 0.2)) + "px Arial";
      ctx.textAlign = "left";
      ctx.fillStyle = colorSelector(this, this.value);
      ctx.fillText(
        this.value,
        this.x + this.size * 0.25,
        this.y + this.size * 0.75
      );

      if (this.mine) {
        //Draw the mine
        ctx.drawImage(
          mineIMG,
          this.x + this.size * 0.1,
          this.y + this.size * 0.1,
          this.size * 0.8,
          this.size * 0.8
        );
      }

    } else if (this.flag) {
      //Draw the flag
      ctx.drawImage(
        flagIMG,
        this.x + this.size * 0.2,
        this.y + this.size * 0.1,
        this.size * 0.6,
        this.size * 0.7
      );

    }

    ctx.closePath();

  };

}

/*
    Images are hosted on github, but since the URL takes too
    much place, I've put it at the end. Sometime, the browser
    can't access file from the directory so it won't be able to
    display the images, here are the back up links.
*/

mineIMG.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjEwMHB4IiBoZWlnaHQ9IjEwMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMzMjJGMzEiIGQ9Ik00NC45MjEsOTAuNzk5Yy00LjE3Ni0wLjE4OC04LjAzMi0xLjU2Ni0xMS44NDktMy4xMjcKCQljLTAuNzc3LTAuMzE2LTAuOTYyLTAuNzg5LTEuMDE4LTEuNTU1Yy0wLjI4My0zLjg3MS0yLjA3OS03LjA5NC00LjQ0Mi0xMC4wNTVjLTMuNjE1LTQuNTMxLTguMTA4LTcuNTY4LTE0LjAwNi04LjE3NgoJCWMtMC41OTUtMC4wNjEtMS4wMDUtMC4yMjMtMS4yMzktMC43OTVjLTEuNTg2LTMuODg1LTMuMDQxLTcuODAxLTMuMjExLTEyLjA2MWMwLjQ1NC0wLjc4OSwwLjA4Ny0xLjYyMywwLjE2MS0xLjkzNgoJCWMwLjAwMywwLjA3LDAuMjUsMC42NjYtMC4yNSwxLjE2Yy0wLjUzMS0yLjg0NC0wLjUzMS01LjY4OCwwLTguNTMzYzAuNDk5LDAuNDk3LDAuMjU1LDEuMDkyLDAuMjUsMS4xNwoJCWMtMC4wNzUtMC4zMjIsMC4yOTYtMS4xNTctMC4xNjUtMS45NDZjMC4xNy00LjI1MywxLjYxOS04LjE2OCwzLjIxMS0xMi4wNGMwLjQyOC0xLjA0LDEuMzgzLTAuMzk3LDEuOTk5LTAuNTkxCgkJYzQuMjI0LTEuMzMsOC4yNzUtMi45NTUsMTEuNDMtNi40YzMuMzM4LTMuNjQ2LDUuOTgtNy40OTksNi4zMDUtMTIuNTg4YzAuMDMzLTAuNTI3LDAuMzczLTAuNzk1LDAuODM2LTAuOTYKCQljMy45MTEtMS4zODUsNy43MzEtMy4xMSwxMS45OS0zLjE4OWMwLjc4NywwLjQ5MywxLjYyNiwwLjAzMSwyLjAwOSwwLjE2MWMtMC4xNDIsMC4wMDgtMC43MzcsMC4yNTItMS4yMzQtMC4yNDcKCQljMi44NDUtMC41MzEsNS42ODktMC41MzEsOC41MzQsMGMtMC40OTYsMC41LTEuMDkyLDAuMjUzLTEuMTYxLDAuMjVjMC4zMTMtMC4wNzMsMS4xNDYsMC4yOTMsMS45MzYtMC4xNjEKCQljNC4xODQsMC4xNzUsOC4wMzgsMS41NzIsMTEuODYsMy4xMjljMC43OCwwLjMxOCwwLjkzOCwwLjgwNCwxLjAxNywxLjU2YzAuMzk5LDMuNzk4LDIuMTI1LDYuOTczLDQuMzgzLDEwLjAyNgoJCWMzLjU1Miw0LjgwMiw4LjI2Myw3LjM3NCwxNC4wNTMsOC4xODJjMC43MTgsMC4xLDEuMDU5LDAuMzkxLDEuMzE5LDEuMDIxYzEuNTIxLDMuNjY5LDIuODQ2LDcuMzg3LDMuMDk3LDExLjQKCQljLTAuMzQ5LDAuNzQyLTAuMTI2LDEuNDcyLTAuMTU0LDIuMDI0Yy0wLjE4Mi0wLjE2OC0wLjAzLTAuNDc4LDAuMjctMC43NzdjMC41NDksMi44MjksMC41NDksNS42NTcsMCw4LjQ4NQoJCWMtMC4zMTItMC4xMzUtMC4xNzctMC40OTItMC4zNTctMC43MTljMC4xNzYsMC41MDYtMC4xMTYsMS4wNzQsMC4yOCwxLjUxOGMtMC4yMjQsNC4wODgtMS40NDYsNy45MTItMy4wOTgsMTEuNjE3CgkJYy0wLjM0OSwwLjc4My0wLjg1MywxLjE2Ni0xLjg1NSwxLjI5OWMtOC45MzcsMS4xNzYtMTYuNjg3LDguOTY5LTE3LjkyNCwxNy45MTZjLTAuMTA2LDAuNzcxLTAuMDk4LDEuNDE4LTEuMDE3LDEuODA1CgkJYy02Ljc5NiwyLjg2My0xMy43OTgsNC4yNzMtMjEuMTgyLDMuMjE5YzAuMTMzLTAuMTkzLDAuMzI3LTAuMjc5LDAuNTU0LTAuMjgxYzAuMzY5LTAuMDAyLDAuNzQzLTAuMDc4LDAuODUzLTAuMDI1CgkJQzQ2LjU0Myw5MC43MTEsNDUuNzEsOTAuMzQ2LDQ0LjkyMSw5MC43OTl6Ii8+Cgk8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzMyMkYzMSIgZD0iTTcwLjE4OSw4My45NDNjMi4yODctNi44NjcsNi43MjgtMTEuNTc4LDEzLjcyOS0xMy43MjkKCQljMC43MjMsMC4wMjksMS4zNDUsMC4yOTUsMS44NywwLjc5MWMxLjQ5Myw1LjcxOSwzLjAyMiwxMS40Myw0LjQ1OCwxNy4xNjJjMC40NDIsMS43NjgtMC4zMTksMi41MzctMi4wOCwyLjA5NgoJCWMtNS43MzUtMS40MzQtMTEuNDQ3LTIuOTY1LTE3LjE2OS00LjQ1N0M3MC40NTUsODUuMzA1LDcwLjIyOCw4NC42NjQsNzAuMTg5LDgzLjk0M3oiLz4KCTxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMzIyRjMxIiBkPSJNODMuOTE3LDI5Ljc2Yy0zLjE3OS0wLjc1LTUuNjIxLTIuNTU5LTcuOTgzLTQuODA5CgkJYy0yLjQ2My0yLjM0NS00LjM3Ny00LjkxLTUuNjE3LTguMDI3Yy0wLjEwNy0wLjI3MS0wLjA4Ni0wLjU5My0wLjEyNC0wLjg5MmMwLjI0OS0wLjYyOCwwLjIxMS0xLjM3OCwwLjc4OS0xLjg2OAoJCWM1LjcyNy0xLjQ5NiwxMS40NDUtMy4wMjksMTcuMTg4LTQuNDYzYzEuNzY2LTAuNDQxLDIuNTIzLDAuMzI1LDIuMDgsMi4wOTZjLTEuNDM2LDUuNzM2LTIuOTY3LDExLjQ0OC00LjQ2LDE3LjE3CgkJQzg1LjMsMjkuNTUxLDg0LjU0OCwyOS41MTIsODMuOTE3LDI5Ljc2eiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMzMjJGMzEiIGQ9Ik0xNC4xNDcsMjguOTU4Yy0xLjQ5My01LjcyMS0zLjAyMy0xMS40MzMtNC40NTgtMTcuMTY4CgkJYy0wLjQ0MS0xLjc2MSwwLjMyNS0yLjUxNCwyLjA5Mi0yLjA4OWM1LjAwNiwxLjIwNSwxMC4wMTEsMi40MjcsMTQuOTU4LDMuODQ0YzAuNzE1LDAuMjA1LDEuNjQ2LTAuMTQsMi4yMDQsMC42MgoJCWMwLjIxLDAuNTI5LDAuOTc1LDAuNzIxLDAuODc1LDEuNDM4Yy0wLjE1NywyLjQ1MS0xLjM5OSw0LjUwNi0yLjkzOSw2LjE4N2MtMy4xNjksMy40NTktNi4xNjgsNy4zLTExLjMwNSw4LjA0OQoJCUMxNC44NTcsMjkuOTM3LDE0LjY2LDI5LjE5MSwxNC4xNDcsMjguOTU4eiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMzMjJGMzEiIGQ9Ik0xNi4wMTEsNzAuMjA5YzIuOTAzLDAuMzU3LDUuMDEzLDIuMTU4LDYuOTUzLDQuMDc4CgkJYzIuNzIzLDIuNjk1LDUuODU1LDUuMTQ1LDYuNzI4LDkuMjExYy0wLjE2OCwwLjc5NywwLjA1NSwxLjcyNS0wLjc2MywyLjMwN2MtNS43MTIsMS40OTItMTEuNDE2LDMuMDItMTcuMTQzLDQuNDU1CgkJYy0xLjc0OSwwLjQzOS0yLjUzMi0wLjM0NC0yLjA5NC0yLjA5NGMxLjQzNi01LjcyNSwyLjk2My0xMS40MjgsNC40NTUtMTcuMTQxQzE0LjY0Nyw3MC40NzcsMTUuMjk0LDcwLjI2MiwxNi4wMTEsNzAuMjA5eiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMzMjJGMzEiIGQ9Ik00Ni4zNzUsNi45MjFjLTAuNTQ2LDAuMzQ2LTEuMTIyLDAuNDE4LTEuODcyLDAuMTU1CgkJYzEuMzUxLTEuOTg0LDIuNjI4LTMuOTU3LDQuMDA5LTUuODU1YzAuOTM3LTEuMjg3LDIuMDAxLTEuMjg3LDIuOTM1LDAuMDY2YzEuMzIxLDEuOTE0LDIuNjE5LDMuODQ1LDMuOTUyLDUuODA3CgkJYy0wLjcyMSwwLjI0Mi0xLjI5OCwwLjE3NS0xLjg0NC0wLjE3M2MtMC44NTktMC41NTItMS43Ni0wLjI5Mi0yLjY1NS0wLjEzMmMtMC42MjYsMC0xLjI1MSwwLTEuODc3LDAKCQlDNDguMTI5LDYuNjI5LDQ3LjIzMiw2LjM2OSw0Ni4zNzUsNi45MjF6Ii8+Cgk8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzMyMkYzMSIgZD0iTTQ5LjAzMiw5My4xNjRjMC42MjIsMCwxLjI0NCwwLDEuODY1LDAKCQljMC44OTQsMC4yMDUsMS43ODcsMC40NTEsMi42NDctMC4xMTFjMC41NDItMC4zNDYsMS4xMTYtMC40MTgsMS44OC0wLjE2MmMtMS40NTMsMi4xMTMtMi43NjIsNC4yNy00LjMzNCw2LjIxMQoJCWMtMC45NzksMS4yMTEtMi4wNDksMC40OTgtMi43ODItMC41NjNjLTEuMjQ5LTEuODA5LTIuNDU4LTMuNjQ1LTMuNy01LjQ5NGMwLjYzLTAuNjAyLDEuMi0wLjIzOCwxLjc3LDAuMDA4CgkJQzQ3LjI0MSw5My42MTUsNDguMTM4LDkzLjM2Nyw0OS4wMzIsOTMuMTY0eiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMzMzMwMzIiIGQ9Ik02Ljg4MSw1My4xMjljMC4zODcsMC42OTMsMC40MTMsMS40MjQsMC4yMTYsMi4zNQoJCWMtMi4xNDMtMS40NzUtNC4yOTEtMi44MDEtNi4yNS00LjM2MWMtMS4wNTEtMC44MzgtMC42OC0xLjg4LDAuNDE3LTIuNjIxYzEuOTMzLTEuMzA0LDMuODUxLTIuNjI4LDUuODQzLTMuOTkxCgkJYzAuMTg1LDAuOTE2LDAuMTQ3LDEuNjQ5LTAuMjI2LDIuMzQ2Yy0wLjYzMywwLjQ2NS0wLjA4NSwxLjEyNS0wLjI3NCwxLjY2N2MwLDAuOTcyLDAuMDAxLDEuOTQzLDAsMi45MQoJCUM2Ljc4LDUxLjk4LDYuMjcsNTIuNjQ1LDYuODgxLDUzLjEyOXoiLz4KCTxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMzIyRjMxIiBkPSJNOTMuMDM0LDQ2Ljg2OWMtMC4zODctMC42MTktMC4zMDgtMS4zMTQtMC4zNDYtMi4wOAoJCWMyLjQzMSwwLjcyLDMuOTksMi43MzMsNi4xMSwzLjg2MWMxLjE3LDAuNjIyLDEuMjY2LDEuODgzLDAuMTA4LDIuNTgyYy0yLjA5OSwxLjI2OC0zLjgwNywzLjEwOS02LjExNSw0LjEwOQoJCWMtMC4xNjEtMC43OTctMC4xMzEtMS41MzEsMC4yNDItMi4yMzJjMC42NjYtMC40MzksMC4wOTMtMS4wOTgsMC4yODUtMS42MjNjMC0wLjk3My0wLjAwMS0xLjk0NS0wLjAwMS0yLjkxNAoJCUM5My4xMjEsNDguMDIzLDkzLjY5NSw0Ny4zNDMsOTMuMDM0LDQ2Ljg2OXoiLz4KCTxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMjYyMjI1IiBkPSJNMjguOTI5LDg1LjgwNWMwLjI1NC0wLjc3LDAuNTA5LTEuNTM5LDAuNzYzLTIuMzA3CgkJQzI5LjYzOCw4NC4zMzIsMzEuMjQ0LDg1LjcxNywyOC45MjksODUuODA1eiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMyNjIzMjUiIGQ9Ik0xNi4wMTEsNzAuMjA5Yy0wLjU4NCwwLjM1Ny0xLjExNiwwLjgzNi0xLjg2NCwwLjgxNgoJCUMxNC4xMDUsNjkuMjM4LDE1LjExNyw2OS44NTUsMTYuMDExLDcwLjIwOXoiLz4KCTxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMjcyMzI2IiBkPSJNODUuNzg5LDcxLjAwNmMtMC43NjksMC4wNzgtMS4yNzYtMC40NTctMS44Ny0wLjc5MQoJCUM4NC44LDY5Ljg2OSw4NS44MTIsNjkuMjE1LDg1Ljc4OSw3MS4wMDZ6Ii8+Cgk8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzI2MjMyNSIgZD0iTTcwLjE4OSw4My45NDNjMC4zNDYsMC41ODgsMC45ODUsMS4wNDksMC44MDksMS44NjMKCQlDNjkuMjEzLDg1Ljg0NCw2OS44NjEsODQuODI0LDcwLjE4OSw4My45NDN6Ii8+Cgk8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzE5MTQxOCIgZD0iTTYuMzk1LDUxLjgyMmMwLTEuMjIzLDAtMi40NDMsMC0zLjY2NAoJCWMwLjEzOC0wLjIxMSwwLjI3Ni0wLjIxMSwwLjQxNS0wLjAwMmMwLDEuMjIzLDAsMi40NDUsMCwzLjY2NkM2LjY3LDUyLjAzMyw2LjUzMiw1Mi4wMzEsNi4zOTUsNTEuODIyeiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMxOTE0MTgiIGQ9Ik05My41Myw0OC4xNmMwLDEuMjIsMCwyLjQ0LDAsMy42NjEKCQljLTAuMTMxLDAuMjE3LTAuMjY1LDAuMjA3LTAuMzk4LDAuMDAyYzAtMS4yMjEsMC0yLjQ0MywwLTMuNjY2QzkzLjI2Niw0Ny45NDksOTMuMzk5LDQ3Ljk1LDkzLjUzLDQ4LjE2eiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMyNjIyMjUiIGQ9Ik03MC45ODEsMTQuMTY2YzAuMDc0LDAuNzY1LTAuNDU5LDEuMjczLTAuNzg5LDEuODY4CgkJQzY5Ljg5OSwxNS4xNzYsNjkuMTk2LDE0LjE0Niw3MC45ODEsMTQuMTY2eiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMyNzIzMjYiIGQ9Ik0yOS44MTksMTUuNjAzYy0wLjI1NS0wLjUwMi0xLjI0NS0wLjU1Ny0wLjg3NS0xLjQzOAoJCUMzMC4wNzUsMTQuMTMzLDMwLjQ4NiwxNC41NCwyOS44MTksMTUuNjAzeiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMyNjIzMjUiIGQ9Ik0xNC4xNDcsMjguOTU4YzAuODY0LTAuMzM1LDAuOTMxLDAuNjIxLDEuNDI3LDAuODgxCgkJQzE0LjUyMywzMC40NzgsMTQuMTEsMzAuMDgyLDE0LjE0NywyOC45NTh6Ii8+Cgk8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzI2MjIyNSIgZD0iTTgzLjkxNywyOS43NmMwLjU5Ni0wLjMzLDEuMTA3LTAuODU5LDEuODcyLTAuNzkxCgkJQzg1LjgwOSwzMC43NTYsODQuNzc3LDMwLjA1NSw4My45MTcsMjkuNzZ6Ii8+Cgk8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzFEMTgxQyIgZD0iTTQ2LjM3NSw2LjkyMWMwLjg0MS0wLjg3OCwxLjczOS0wLjYwNCwyLjY0Ny0wLjEzMgoJCUM0OC4xNCw2LjgzMyw0Ny4yNTgsNi44NzcsNDYuMzc1LDYuOTIxeiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMxRDE4MUMiIGQ9Ik01MC44OTksNi43OWMwLjg1NC0wLjY1NywxLjc5OC0wLjM3MSwyLjcyMy0wLjI1MwoJCWMwLjAyNCwwLjAwMywwLjA1NCwwLjEzMiwwLjA0MiwwLjE5NWMtMC4wMTIsMC4wNjgtMC4wNzEsMC4xMjctMC4xMDksMC4xOUM1Mi42Nyw2Ljg3Nyw1MS43ODUsNi44MzMsNTAuODk5LDYuNzl6Ii8+Cgk8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzI2MjIyNSIgZD0iTTU1LjAwNSw5LjE4MWMtMC44NiwwLjc3NC0xLjgwNywwLjM5Mi0yLjc0OCwwLjEyMQoJCWMwLjY1Ny0wLjA3LDEuMzE1LTAuMTQsMS45NzQtMC4yMUM1NC40ODgsOS4xMjIsNTQuNzQ3LDkuMTUyLDU1LjAwNSw5LjE4MXoiLz4KCTxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMjYyMjI1IiBkPSJNNDUuNjk2LDkuMDkyYzAuNjU4LDAuMDcsMS4zMTUsMC4xNCwxLjk3MywwLjIxCgkJYy0wLjk0MSwwLjI2OS0xLjg4OCwwLjY1Ni0yLjc0OC0wLjEyNEM0NS4xOCw5LjE0OSw0NS40MzgsOS4xMjEsNDUuNjk2LDkuMDkyeiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMyNjIyMjUiIGQ9Ik05LjE1MSw0NC45NDdjMC43ODEsMC44NiwwLjM5NCwxLjgwNywwLjEyNSwyLjc1CgkJYy0wLjA3LTAuNjU4LTAuMTQtMS4zMTYtMC4yMS0xLjk3NEM5LjA5NCw0NS40NjQsOS4xMjMsNDUuMjA2LDkuMTUxLDQ0Ljk0N3oiLz4KCTxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMUIxNzFBIiBkPSJNNTMuNTQ1LDkzLjA1M2MtMC42OTEsMC43MDUtMS4xNjEsMC43MjUtMi42NDcsMC4xMTEKCQlDNTEuNzgsOTMuMTI3LDUyLjY2Miw5My4wOSw1My41NDUsOTMuMDUzeiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMyNjIyMjUiIGQ9Ik00NC45MjEsOTAuNzk5YzAuODYxLTAuNzc1LDEuODA3LTAuMzkzLDIuNzQ5LTAuMTIxCgkJYy0wLjY1OCwwLjA3LTEuMzE2LDAuMTQxLTEuOTc0LDAuMjA5QzQ1LjQzOCw5MC44NTcsNDUuMTgsOTAuODI4LDQ0LjkyMSw5MC43OTl6Ii8+Cgk8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzI2MjIyNSIgZD0iTTkuMDY2LDU0LjI1NmMwLjA3LTAuNjU4LDAuMTQtMS4zMTYsMC4yMS0xLjk3NQoJCWMwLjI3MSwwLjk0MywwLjY1MywxLjg4OS0wLjEyMSwyLjc1QzkuMTI1LDU0Ljc3Myw5LjA5NSw1NC41MTQsOS4wNjYsNTQuMjU2eiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMxQjE3MUEiIGQ9Ik00OS4wMzIsOTMuMTY0Yy0wLjg0NCwwLjcwNS0xLjc5NiwwLjM4NS0yLjcyMywwLjI3NwoJCWMtMC4wMjMtMC4wMDItMC4wNTMtMC4xMzMtMC4wNDEtMC4xOTdjMC4wMTMtMC4wNjgsMC4wNzItMC4xMjksMC4xMS0wLjE5MUM0Ny4yNjMsOTMuMDksNDguMTQ4LDkzLjEyNyw0OS4wMzIsOTMuMTY0eiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMyMzFGMjIiIGQ9Ik05MC44NDksNDUuNzQ3Yy0wLjA4LDAuMzU1LTAuMTYsMC43MTEtMC4zMDYsMS4zNTcKCQljLTAuMjQ0LTEuMTAxLTAuNDUxLTEuODkxLDAuMTktMi42MDRDOTAuNzcyLDQ0LjkxNiw5MC44MTEsNDUuMzMyLDkwLjg0OSw0NS43NDd6Ii8+Cgk8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzFGMUIxRSIgZD0iTTYuMzk1LDUxLjgyMmMwLjEzOSwwLDAuMjc3LDAuMDAyLDAuNDE1LDAKCQljMC4wMjQsMC40MzYsMC4wNDgsMC44NzEsMC4wNzIsMS4zMDdjLTAuMDUsMC4xMzctMC4wNjEsMC4zMTQtMC4xNTYsMC40QzYuNDksNTMuNzQsNi40LDUzLjU3Miw2LjM5Niw1My4zNDIKCQlDNi4zODgsNTIuODM2LDYuMzk1LDUyLjMyOCw2LjM5NSw1MS44MjJ6Ii8+Cgk8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzIwMUMxRiIgZD0iTTkzLjUzLDQ4LjE2Yy0wLjEzMy0wLjAwMi0wLjI2Ni0wLjAwMy0wLjM5OC0wLjAwMwoJCWMtMC4wMzItMC40MjktMC4wNjUtMC44NTgtMC4wOTgtMS4yODhjMC4wNDktMC4xMzgsMC4wNjItMC4zMTEsMC4xNTQtMC40MDZjMC4yMTYtMC4yMjEsMC4zMzQtMC4wODYsMC4zNCwwLjE2MQoJCUM5My41MzksNDcuMTM2LDkzLjUzMSw0Ny42NDgsOTMuNTMsNDguMTZ6Ii8+Cgk8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzIwMUMxRiIgZD0iTTkzLjEzMiw1MS44MjJjMC4xMzMsMCwwLjI2NiwwLDAuMzk5LTAuMDAyCgkJYzAsMC41MTIsMC4wMDgsMS4wMjMtMC4wMDMsMS41MzVjLTAuMDA2LDAuMjQ4LTAuMTI1LDAuMzgxLTAuMzQsMC4xNmMtMC4wOTMtMC4wOTYtMC4xMDUtMC4yNy0wLjE1NC0wLjQwNgoJCUM5My4wNjYsNTIuNjgsOTMuMSw1Mi4yNTIsOTMuMTMyLDUxLjgyMnoiLz4KCTxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMjMxRjIyIiBkPSJNOTAuNzcxLDU1LjAzMWMtMC42NTktMC40ODYtMC4zNzctMS4xNDMtMC40Mi0xLjgyMgoJCWMwLjYyMywwLjIyMSwwLjMwMSwwLjczLDAuNDk3LDEuMDIzQzkwLjgyMyw1NC40OTgsOTAuNzk3LDU0Ljc2Niw5MC43NzEsNTUuMDMxeiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMxRjFCMUUiIGQ9Ik02LjgxLDQ4LjE1NmMtMC4xMzgtMC4wMDEtMC4yNzYsMC0wLjQxNSwwLjAwMgoJCWMwLTAuNTA3LTAuMDA2LTEuMDE1LDAuMDAxLTEuNTIyYzAuMDAzLTAuMjMsMC4wOTYtMC4zOTcsMC4zMjktMC4xODVjMC4wOTUsMC4wODYsMC4xMDcsMC4yNjQsMC4xNTYsMC40CgkJQzYuODU4LDQ3LjI4Niw2LjgzNCw0Ny43MjEsNi44MSw0OC4xNTZ6Ii8+Cgk8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI0ZERkRGRCIgZD0iTTYxLjk4Niw1MC4wOTJjLTAuMDMxLDUuNTY4LTUuMzc4LDEyLjIxMy0xMC4wMjksMTIuMTUKCQljLTguODc2LTAuMTIxLTEzLjc3NC00LjQ1Ny0xMy45Ny0xMi4yODFjLTAuMTc2LTcuMDIxLDUuNDQ2LTEyLjA1MSwxMi4xMTktMTEuOTk3QzU2LjcyOCwzOC4wMTksNjIuMDI0LDQzLjQyMyw2MS45ODYsNTAuMDkyeiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMzMjJGMzEiIGQ9Ik0zOS45MzEsNDguNjI4YzAuMjcxLTMuOTk4LDMuMTIzLTcuNzQ3LDguNjc1LTguNjcKCQljMC45MDYsMC4yODQsMS44MTMsMC4yODIsMi43MiwwLjAwMWM0LjcyMiwwLjU0MSw4LjExNSwzLjkzNyw4LjY2Nyw4LjY3M2MtMC4yNzksMC45MDYtMC4yNzcsMS44MTMtMC4wMDEsMi43MTkKCQljMC4wMjEsNC4wMzctNC44NTcsOC44MDEtOC42NzEsOC42NjZjLTAuOTA3LTAuMjc1LTEuODEzLTAuMjgxLTIuNzE5LDAuMDA0Yy00Ljc1NS0wLjU1My04LjEyLTMuOTE2LTguNjcxLTguNjc0CgkJQzQwLjIxNiw1MC40NDEsNDAuMjE0LDQ5LjUzNSwzOS45MzEsNDguNjI4eiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMxRDE4MUMiIGQ9Ik0zOS45MzEsNDguNjI4YzAuNjIsMC45MDcsMC42MjMsMS44MTMsMCwyLjcyCgkJQzM5LjY5NSw1MC40NDEsMzkuNjk1LDQ5LjUzNSwzOS45MzEsNDguNjI4eiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMxRTE5MUQiIGQ9Ik01OS45OTEsNTEuMzUyYy0wLjYxMy0wLjkwNi0wLjYxNi0xLjgxMywwLjAwMS0yLjcxOQoJCUM2MC4yMzEsNDkuNTM5LDYwLjIzMSw1MC40NDUsNTkuOTkxLDUxLjM1MnoiLz4KCTxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMUMxODFCIiBkPSJNNTEuMzI1LDM5Ljk1OWMtMC45MDcsMC42MTctMS44MTMsMC42Mi0yLjcyLTAuMDAxCgkJQzQ5LjUxMiwzOS43MjYsNTAuNDE5LDM5LjcyNiw1MS4zMjUsMzkuOTU5eiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMxRDE4MUMiIGQ9Ik00OC42MDIsNjAuMDIxYzAuOTA1LTAuNjIzLDEuODEyLTAuNjE1LDIuNzE5LTAuMDA0CgkJQzUwLjQxNCw2MC4yNTYsNDkuNTA4LDYwLjI1Niw0OC42MDIsNjAuMDIxeiIvPgo8L2c+Cjwvc3ZnPgo=";
flagIMG.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjEwMHB4IiBoZWlnaHQ9IjEwMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiM1QzVBNDQiIGQ9Ik0xNC42NzcsMTAwLjIwNGMtMS4xNzctMS45NzktMi4wNjQtMy44OTItMi4wNTQtNi40MTkKCQljMC4xMjQtMjguNDg2LDAuMDgxLTU2Ljk3NSwwLjA4MS04NS40NjJjMC0yLjQ5OS0wLjMzMi01LjIxMywyLjc1Ni02LjI2YzMuNzAzLTEuMjU2LDYuMTYsMC43NzksNi4yMDQsNS4yOTUKCQljMC4wOTIsOS40OTUsMC4wMzIsMTguOTkxLDAuMDMyLDI4LjQ4N2MwLjAwMSwxOC44MjUtMC4wMzcsMzcuNjQ5LDAuMDM3LDU2LjQ3NWMwLjAxMiwzLjExOC0wLjM1MSw1LjkwNi0zLjA1Niw3Ljg4NAoJCUMxNy4zNDMsMTAwLjIwNCwxNi4wMSwxMDAuMjA0LDE0LjY3NywxMDAuMjA0eiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiNFNDI5MTIiIGQ9Ik04OC43NDgsMTAuMjM1YzIuNjI4LTEuNTI1LDIuNDE1LDAuNzg1LDIuNDIxLDIuMDI1CgkJYzAuMDY0LDE0LjQ3MiwwLjA1MywyOC45NDQtMC4wMDksNDMuNDE2Yy0wLjAwOSwxLjkxOS0wLjg4NywzLjM3Mi0yLjgyOSw0LjI5MmMtMTEuMTI5LDUuMjcxLTIyLjE4NCw2LjE2MS0zMy40MzIsMC4yMzQKCQljLTUuNTExLTIuOTAzLTEwLjk1LTUuODYyLTE3LjcwNi01LjUyNmMtNC4wMjQsMC4yLTcuMTUxLDIuMjgyLTExLjM4NiwzLjU0YzAtOC41OTgsMC0xNi44MSwwLTI1LjAyMQoJCWMwLTYuNjU0LTAuMDA3LTEzLjMwOCwwLTE5Ljk2MmMwLjAxLTguMzQzLDUuODY4LTEzLjQ3OSwxNC4yMDEtMTIuMzk1YzMuNDk2LDAuNDU2LDcuMDQyLDEuMyw5Ljc5MiwzLjQ0NwoJCWMxMS4xNDksOC43MDcsMjMuMjI5LDExLjcwOSwzNi44MzgsNi44MzljMC42MDUsMC44OSwxLjQxMywxLjM4NCwyLjM2NiwwLjY1NkM4OS42MjMsMTEuMzEsODkuMjkzLDEwLjY4MSw4OC43NDgsMTAuMjM1eiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiNFMzFDMDQiIGQ9Ik04OC43NDgsMTAuMjM1YzAuNTQ1LDAuNDQ1LDAuODc1LDEuMDc0LDAuMjU3LDEuNTQ3CgkJYy0wLjk1MywwLjcyOC0xLjc2MSwwLjIzMy0yLjM2Ni0wLjY1NkM4Ny4zNDIsMTAuODI5LDg4LjA0NSwxMC41MzIsODguNzQ4LDEwLjIzNXoiLz4KPC9nPgo8L3N2Zz4K";
