<template>
  <main class="container-fluid"> 
    <div class="row align-content-center">
      <div class="img d-flex align-items-center justify-content-center">
        <div class="text text-light">ABOUT</div> 
      </div>
      <div class="col-2"></div>
      <div class="col-8">
        <div class="card">
            <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur tenetur totam, quas architecto incidunt sunt velit alias tempora, quibusdam accusamus modi dolore temporibus voluptatibus optio laudantium veritatis, ullam id rerum?
            Incidunt, dolorum? Rerum assumenda natus voluptatum dolorem quos, voluptate autem optio odio fuga dolore, culpa esse, fugit suscipit magnam omnis veritatis vero dolor itaque molestiae eius reprehenderit officia vitae! Veniam?
            Dicta eos quod alias laborum illo, exercitationem officiis neque omnis aliquid, quam consequatur, sed error. Corrupti id vel quos voluptatem, recusandae explicabo rerum voluptas sunt atque consectetur aliquam cupiditate? Repellat.
            Nobis facere recusandae repudiandae incidunt repellat dolore asperiores eius magnam, voluptatem impedit dolorem molestiae molestias cumque quos enim ipsam aliquid doloribus? Molestias deleniti sequi optio nemo quod aspernatur beatae consequuntur.
            Autem recusandae necessitatibus maxime sint impedit, maiores veritatis neque consequuntur est quaerat earum et quas libero dolorum ex temporibus aperiam deserunt quia. Fugit ut quibusdam iste aut consequatur quo eos.
            </p>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </main>
</template>

<script>

export default {
  name: 'AboutView',

}

</script>

<style scoped>

.container-fluid{
  height: 92vh;
}
.img {
  height: 60vh;
  background: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('../assets/bg.jpg');
  background-position: 40% 20%;
  background-size: cover;
}
.text{
  font-size: 3rem;
  font-weight: bold;
}
.card{
  margin-top: -20vh;
  padding:20px;
  width:100%;
  background:rgba(0, 0, 0, .3);
  box-shadow:0 5px 15px rgba(0,0,0,.5);
}
.card p{
  font-size:16px;
  color: white;
}

</style>