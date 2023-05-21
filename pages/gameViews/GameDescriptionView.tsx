import React, { useEffect, useState } from "react";

const GameDescriptionView: React.FC = ({}) => {
  const closeModal = async () => {
    await miro.board.ui.closeModal();
  };

  return (
    <div className="description-modal-container">
      <div className="description-modal-content">
      <h1>DigDeeper</h1>
      <p>
        Group activities such as brainstorming are invaluable when it comes to
        unlocking new perspectives and ideas. By encouraging participants to
        generate as many ideas as possible within a short period of time, these
        activities break through mental barriers and open up a world of fresh
        possibilities. However, to truly harness the potential of collective
        thinking, we need a structured framework that can effectively organize
        and synthesize the generated ideas.{" "}
      </p>
      <p>
        Enter DigDeeper — a powerful tool designed to bring order to the chaos
        of brainstorming sessions. By incorporating computer supported
        visualization techniques, the game enables players and facilitators to
        explore and uncover hidden patterns and insights within their data. It
        transforms the traditional brainstorming process into a dynamic and
        interactive experience by leveraging the infinite canvas. Combining the
        creativity and expertise of a group with the analytical power of
        computer-supported collaboration, DigDeeper empowers individuals to
        contribute their unique perspectives, while simultaneously providing a
        platform that organizes, clusters, and synthesizes their ideas.{" "}
      </p>
      <p>
        By embracing DigDeeper you can uncover novel perspectives, identify
        trends, and make connections that were previously hidden. Empowered by
        the game's ability to surface valuable insights, you'll make better
        decisions, innovate more effectively, and drive your projects forward.
      </p>
      <h2>Object of Play</h2>
      <p>
        Imagine the power of combining the collective perspectives of
        individuals and leveraging cutting-edge digital tools to extract a
        collective inference. DigDeeper enables players to embark on a journey
        of discovery, starting with an initial dataset comprised of
        interconnected images. These images can represent a myriad of visual
        datasets, ranging from information visualizations and designs to user
        interfaces and articles.
      </p>
      <p>
        Interactive information visualizations let you dive deep into collective
        ideas and explore the interconnected web of associations you may have
        never considered before. DigDeeper offers to uncover hidden insights and
        patterns, but it also provides facilitators, such as teachers,
        researchers, designers, and workshop leaders, with a valuable tool for
        analyzing and understanding the players' perspectives.
      </p>{" "}
      <p>
        The potential applications of DigDeeper are vast and versatile. Whether
        you're seeking to understand what people think about different images,
        their associations with them, their likes and dislikes, or even their
        aesthetic preferences, this game enables participants to synthesize
        their individual perspectives into a holistic view.
      </p>
      <h2>Number of Players</h2>
      <p>up to 20</p>
      <h2>Duration of Play</h2>
      <p>Depends on the number of players and images, but around one hour.</p>
      <h2>How to Play</h2>
      <div>
        <ol>
          <li>
            Begin by dragging an initial dataset of images onto the Miro board.
            Afterwards, each image is enclosed within a frame, transforming it
            into an "information node". Additionally, you can enter a question
            that you want to explore in the game. The information nodes and the
            question will be added to a game grid. The game space is now set,
            and you're ready to play.
          </li>
          <li>
            Important: Before diving in, ensure you have a clear and
            thought-provoking question in mind—one that sparks curiosity and
            generates enough information per image. Craft a question that can be
            answered with a single word, igniting imagination and paving the way
            for insightful exploration.
          </li>
          <li>
            Next invite players to contribute their response to the question.
            Each player silently visits the grid of nodes, engaging with every
            image and sharing their thoughts through sticky notes. These notes,
            containing a single word, are placed within the frame surrounding
            each image—allowing them to become intertwined with the visual
            representation. This process typically takes around 10 minutes, with
            the suggestion of leaving at least three sticky notes per image per
            player. Feel free to encourage players to create even more notes,
            should time permit, as the game's richness will only expand.
          </li>
          <li>
            Now, the next phase of the game begins—the clustering process.
            Select the nodes that encompass the frames housing the images and
            players' notes. With a clear vision in mind, determine the number of
            clusters or categories you wish to create. The game then generates
            copies of the images. Engage the group in finding clusters in the
            images by dragging the newly created images around.
          </li>
          <li>
            Each of the new images is surrounded by a frame that highlight its
            connection to its neighboring images. A yellow frame signifies that
            the image is part of a cluster, with similar neighboring images. In
            contrast, a blue frame indicates that the image stands out amidst
            its neighbors. Allow the clustering to flow naturally and try not to
            spend too much time on discussions about details.
          </li>
          <li>
            As the clusters take shape, the time arrives to add labels that
            encapsulate their essence. Utilize the game's automatic
            label-generation feature or invite the group to offer their
            suggestions. The labels act as guideposts, illuminating the
            collective understanding and inference of the data. Add as many
            labels as you desire. Whenever you feel ready you can now end the
            game.
          </li>
          <li>
            With the game complete, it's time to explore the generated
            information. Transition into the Analysis Phase, where you can
            export the curated data from the game. Explore the insights, unravel
            hidden patterns, and unlock new perspectives with the tool of your
            choice.
          </li>
        </ol>
      </div>
      <button
        className="button button-primary button-right"
        type="button"
        onClick={closeModal}
      >
        Back to Game
      </button>
    </div>
    </div>
  );
};

export default GameDescriptionView;
