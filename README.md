# progressbar
Dependency For QB-Core

Circular Progressbar with access to font awesome icons to change with.

# Previews
![image](https://user-images.githubusercontent.com/82112471/168499116-faaadbbb-b0a3-4708-9330-d96ccb9a885a.png)
![image](https://i.imgur.com/HIz3l2i.jpeg)


# Changes to do!

## 1. qb-core/client/functions.lua

Remove the existing function for progressbar and add this.


```lua
function QBCore.Functions.Progressbar(name, label, duration, useWhileDead, canCancel, disableControls, animation, prop, propTwo, onFinish, onCancel, icon)
    if GetResourceState('progressbar') ~= 'started' then error('progressbar needs to be started in order for QBCore.Functions.Progressbar to work') end
    exports['progressbar']:Progress({
        name = name:lower(),
        duration = duration,
        label = label,
        icon = icon,
        useWhileDead = useWhileDead,
        canCancel = canCancel,
        controlDisables = disableControls,
        animation = animation,
        prop = prop,
        propTwo = propTwo,
    }, function(cancelled)
        if not cancelled then
            if onFinish then
                onFinish()
            end
        else
            if onCancel then
                onCancel()
            end
        end
    end)
end
```

## 2. Delete the old progressbar
Navigate to your [standalone] folder and **remove** the previous progressbar folder

Then paste in this new one making sure you remove `-main` from the name

## 3. If you want custom icons with the progressbar, just add the font-awesome icon like the one in example.
If you dont have Cancelled callback, it will throw error in core. So just use this as an example while adding icons to progressbar. The following script supports fontAwesome 6 icons.

Look for them here - 
https://fontawesome.com/icons
```lua
RegisterNetEvent('consumables:client:Eat', function(itemName)
    TriggerEvent('animations:client:EmoteCommandStart', {"eat"})
    QBCore.Functions.Progressbar("eat_something", "Eating..", 5000, false, true, {
        disableMovement = false,
        disableCarMovement = false,
		disableMouse = false,
		disableCombat = true,
    }, {}, {}, {}, function() -- Done
        TriggerEvent("inventory:client:ItemBox", QBCore.Shared.Items[itemName], "remove")
        TriggerEvent('animations:client:EmoteCommandStart', {"c"})
        TriggerServerEvent("QBCore:Server:SetMetaData", "hunger", QBCore.Functions.GetPlayerData().metadata["hunger"] + ConsumeablesEat[itemName])
        TriggerServerEvent('hud:server:RelieveStress', math.random(2, 4))
    end, function() -- Cancelled
        TriggerEvent('animations:client:EmoteCommandStart', {"c"})
    end, "fa-solid fa-burger")
end)
```

## 4. You can also make use of inventory icons

You will need to check the client/main.lua for the line
```lua
local img = "nui://qb-inventory/html/"
```
change this to the inventory system you use, for example `"nui://qb-inventory/html/"` or `"nui://lj-inventory/html/"`

Then like the preview above, instead of:
```lua
    end, "fa-solid fa-burger")
```
Enter an item name for example.
```lua
    end, "sandwich")
```
or even `itemName` would work perfectly in this instance.
```lua
    end, itemName)
```

## 5. If you recieve the error: `No such Export GetCoreObject in resource qb-core`

You will need to navigate to: `[qb]/qb-core/fxmanifest.lua` and remove the line saying `'progressbar',` which makes it dependancy here.

After this you will need to restart your server to see it work

# Any PR's for changes in UI are welcome!
