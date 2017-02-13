<template>
  <div id="container">
    <section id="content">
      <transition name="fade" mode="out-in" appear>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </section>
  </div>
</template>

<style src="../styles/app"></style>
<style src="../styles/reddot"></style>
