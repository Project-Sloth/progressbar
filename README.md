# progressbar
Dependency For QB-Core

Circular Progressbar with access to font awesome icons to change with.

# Previews
![image](https://user-images.githubusercontent.com/7227325/168553926-c4f7e6cd-b36a-48f0-9b31-48d10fc8a1bf.png)

# Changes to do!

1. qb-core/client/functions.lua

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

2. Delete the old progressbar and add the new one in standalone folder

3. If you want custom icons with the progressbar, just add the font-awesome icon like the one in example.
If you dont have Cancelled callback, it will throw error in core. So just use this as an example while adding icons to progressbar. The following script supports fontAwesome 6 icons. Look for them here - 
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

Any PR's for changes in UI are welcome!
