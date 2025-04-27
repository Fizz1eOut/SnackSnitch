<script setup lang="ts">
  import AppLink from '@/components/Base/AppLink.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
</script>

<template>
  <nav class="nav-modile">
    <app-underlay class="nav-mobile__underlay">
      <app-container>
        <div class="nav-mobile__body">
          <div class="nav-mobile__item">
            <router-link to="/">
              <app-link class="nav-mobile__link">
                <app-icon 
                  name="home" 
                  size="20" 
                  color="var(--color-gray)" 
                  class="nav-mobile__icon"
                />
                Home
              </app-link>
            </router-link>
          </div>

          <div class="nav-mobile__item">
            <router-link to="/competitions">
              <app-link class="nav-mobile__link">
                <app-icon 
                  name="popular" 
                  size="20" 
                  color="var(--color-gray)"
                  class="nav-mobile__icon"
                />
                Popular
              </app-link>
            </router-link>
          </div>
          
          <div class="nav-mobile__item">
            <router-link to="/news">
              <app-link class="nav-mobile__link">
                <app-icon 
                  name="meal-planner" 
                  size="20" 
                  color="var(--color-gray)"
                  class="nav-mobile__icon"
                />
                Meal Planner
              </app-link>
            </router-link>
          </div>

          <div class="nav-mobile__item">
            <router-link to="/news">
              <app-link class="nav-mobile__link">
                <app-icon 
                  name="recipes" 
                  size="20" 
                  color="var(--color-gray)"
                  class="nav-mobile__icon"
                />
                Recipes
              </app-link>
            </router-link>
          </div>
        </div>
      </app-container>
    </app-underlay>
  </nav>
</template>

<style scoped>
  .router-link-active .nav-mobile__link {
    cursor: pointer;
    color: var(--color-white);
  }
  .router-link-active .nav-mobile__icon {
    cursor: pointer;
    color: var(--color-white);
  }
  .nav-mobile__icon {
    margin-bottom: 5px;
  }
  .nav-modile {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
  }
  .nav-mobile__underlay {
    border-radius: 0;
  }
  .nav-mobile__body {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 10px;
    width: 100%;
    text-align: center;
  }
  .nav-mobile__link {
    font-size: 13px;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
