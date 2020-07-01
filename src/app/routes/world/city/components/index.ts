import { CityComponent } from "./city/city.component";
import { CityShopComponent } from "./city-shop/city-shop.component";
import { CityShopTabComponent } from "./city-shop/city-shop-tab/city-shop-tab.component";
import { CityShopContentComponent } from "./city-shop/city-shop-content/city-shop-content.component";
import { CityShopContentShopComponent } from "./city-shop/city-shop-content/city-shop-content-shop/city-shop-content-shop.component";
import { CityShopContentUpgradeComponent } from "./city-shop/city-shop-content/city-shop-content-upgrade/city-shop-content-upgrade.component";
import { CityBuildingComponent } from "./city-building/city-building.component";
import { HuntingPost } from "./city-building/hunt/city-building-huntingPost";
import { HuntPostPost } from "./city-building/hunt/city-building-hunt-post-post.component";
import { CityShopCraftComponent } from "./city-shop/city-shop-content/city-shop-craft/city-shop-craft.component";
import { GymComponent } from "./city-building/gym/gym.component";
import { MerchantComponent } from "./city-building/merchant/merchant.component";

export const components: any[] = [
    CityComponent,
    CityShopComponent,
    CityShopTabComponent,
    CityShopContentComponent,
    CityShopContentShopComponent,
    CityShopContentUpgradeComponent,
    CityBuildingComponent,
    HuntingPost,
    HuntPostPost,
    CityShopCraftComponent,
    GymComponent,
    MerchantComponent,
];

export * from "./city/city.component";
export * from "./city-shop/city-shop.component";
export * from "./city-shop/city-shop-tab/city-shop-tab.component";
export * from "./city-shop/city-shop-content/city-shop-content.component";
export * from "./city-shop/city-shop-content/city-shop-content-shop/city-shop-content-shop.component";
export * from "./city-shop/city-shop-content/city-shop-content-upgrade/city-shop-content-upgrade.component";
export * from "./city-building/city-building.component";
