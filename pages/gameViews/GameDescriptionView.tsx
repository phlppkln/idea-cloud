import React, { useEffect, useState } from "react";

interface GameDescriptionViewProps {
  closeView: () => void;
}

const GameDescriptionView: React.FC<GameDescriptionViewProps> = ({ closeView}) => {
  return (
    <div className="game-description">
    <button
      className="button button-primary"
      type="button"
      onClick={closeView}
    >
      Start NodeExplorer
    </button>
      <p>
        Group activities such as brainstorming allow us to get new perspectives
        by generating as many ideas as possible within a short period of time.
        This allows people to get out of their own way of thinking and to get
        new inputs from other people. Affinity Maps are one approach to
        incorporate this often unstructured method into a frameworks that uses
        clustering methods to bring peoples ideas into relationships. Although,
        Affinity Maps were initially designed for the physical world, they can
        easily be used on digital platforms. NodeExplorer is a computer
        supported visualization game that is based on Affinity Maps and enables
        us to create and explore data within Miro. It uses information
        visualization and natural language processing to discover new insights
        and hidden patterns in our data. In the end, it enables players and
        facilitators to get new insights through the power of computer supported
        collaboration.
      </p>
      <h2>Object of Play</h2>
      <p>
        The objective of NodeExplorer is to give players the power of the the
        infinite canvas and the digital world to find hidden patterns in the
        data. It lets players create their collaborative "Ground Truth" and use
        the realms of natural language processing to find and extract a
        collective inference. and digital tools to create and explore data. It
        allows us to find a common "Ground Truth" of players perspective on an
        initial dataset consisting of images and their connections with each
        other. The dataset can, for example, revolve around one of the following
        research question: "What do people think about the different images?",
        "What do people associate with the images?", "What do people
        like/dislike about the images?", or "How do people like the look of the
        images?". Consequently the images can consist of various information
        visualizations, designs, user interfaces, articles, or any other visual
        dataset. In the beginning, players create a "Ground Truth" that is
        leveraged by natural language processing to find and extract a
        collaborative inference. This lets player use information visualization
        to explore and discover new insights and hidden patterns in their
        collective ideas. They work together to find associations they would not
        have thought of alone. Furthermore, it allows facilitators, such as
        teachers, researchers, designers, and workshop leaders to analyze the
        players perspective on the images as well as
      </p>
      <h2>Number of Players</h2>
      <p>up to 20</p>
      <h2>Duration of Play</h2>
      <p>Depends on number of players, but around one hour</p>
      <h2>How to Play</h2>
      <div>
        <ol>
          <li>
            As a first step, you need to drag an initial dataset consisting of
            images you want to explore on the Miro board. Afterwards you select
            the images and press the "Setup Game" button. This automatically
            builds the game space and puts each image into a frame that
            functions as the the container for this "information node". Each
            node is organized into a game grid and labeled with the title of the
            image. The game is now ready to play.
            <strong>
              Important: Only continue when you have a clear question that you
              want to explore that you know will generate enough information per
              image. Generally speaking, this question should be a question that
              can be answered with a single word, for example "What do you
              think...", "What is your impression ...", etc.
            </strong>
          </li>
          <li>
            Next, ask players to silently visit each node in the grid and to add
            sticky notes with exactly one word in response to the question for
            each node.
            <strong>
              Important: Players need to put the sticky notes in the frame
              surrounding the corresponding image. Otherwise the sticky notes
              can not be assigned to a node.
            </strong>
            Depending on your question, this should take about half a minute to
            a minute per node. You can also instruct players to create more
            sticky notes per node, but this will increase the time needed to
            play the game. We suggest that every player should leave at least
            three sticky notes at each node. Furthermore, the notes are not
            allowed to have a white background color.
          </li>
          <li>
            Afterwards you can start the clustering part of the game. To do so,
            select the nodes that consist of frames that feature the image and
            the players notes. With the game space selected press the "Start
            clustering" button. This will generate copies of the images next to
            the nodes.
          </li>
          <li>
            Now you start to organize the images into clusters of
            similar images based on the notes from player. Involve the group in this
            process as much as possible.
          </li>
          <li>Each image is surrounded by a frame that is used to convey the
          underlying similarity of the notes. A yellow frame indicates that the
          image is surrounded by images of the same cluster, whereas a blue frame 
          indicates that neighbors are from a different cluster.
          The bluer the frame, the more different the neighbors are.</li>
          <strong>
            Don't let the players spend and inordinate amount of time to cluster
            the images.
          </strong>
          <li>
            After the clustering is done, you can find labels for the clusters. You can do this
            either automatically by pressing the "Find labels" button or manually with suggestions from the group.
          </li>
          <li>
            The game is now finished and you can start to explore the data. To do so, you can
            use the "Explore Data" in the "Game Analysis Phase" to start the exploration mode.
          </li>
        </ol>
      </div>
      <h2>Strategy</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla</p>
      <h2>Additional Information</h2>
      <p>
        Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Nulla
        datipsum dolor sit amet, consectetur adipiscing elit. Nulla datipsum
        dolor sit amet, consectetur adipiscing elit. Nulla datipsum dolor sit
        amet, consectetur adipiscing elit. Nulla datipsum dolor sit amet,
        consectetur adipiscing elit. Nulla datipsum dolor sit amet, consectetur
        adipiscing elit. Nulla datipsum dolor sit amet, consectetur adipiscing
        elit. Nulla datdolor sit amet, consectetur adipiscing elit. Nulla datag.
        Hello this is the end
      </p>
      <button
        className="button button-primary"
        type="button"
        onClick={closeView}
      >
        Start NodeExplorer
      </button>
    </div>
  );
};

export default GameDescriptionView;