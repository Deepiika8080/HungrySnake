
function IsCollide(sarr: { x: number; y: number }[]) {
    for (let i = 1; i < sarr.length; i++) {
      if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
        return true;
      }

    }
    if (sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0) {
      return true;
    }
  }


export default IsCollide;