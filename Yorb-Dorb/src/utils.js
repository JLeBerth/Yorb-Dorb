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

export {AABB};