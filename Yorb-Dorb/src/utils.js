function AABB(mouseX, mouseY, bagX, bagY, bagWidth, bagHeight)
{
    if( 
        mouseX < bagX + bagWidth && 
        mouseX > bagX && 
        mouseY < bagY + bagHeight && 
        mouseY > bagY
      ) 
    {
        return true;
    }
    
    return false;
}

const getLinearGradient = (ctx,startX,startY,endX,endY,colorStops) => {
  let lg = ctx.createLinearGradient(startX,startY,endX,endY);
  for(let stop of colorStops){
    lg.addColorStop(stop.percent,stop.color);
  }
  return lg;
};

export {AABB, getLinearGradient};