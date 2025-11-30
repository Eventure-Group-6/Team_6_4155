CREATE TABLE users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_users_username (username),
    UNIQUE KEY uq_users_email (email)
);

CREATE TABLE org (
    id BIGINT NOT NULL AUTO_INCREMENT,
    org_name      VARCHAR(255) NOT NULL,
    org_owner     VARCHAR(255) NOT NULL,
    org_followers BIGINT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE flyers (
    id BIGINT NOT NULL AUTO_INCREMENT,
    org_id          BIGINT      NOT NULL,
    flyer_advert    VARCHAR(255) NOT NULL,
    filePath        VARCHAR(255) NOT NULL,
    popularity_score INT        NOT NULL,
    PRIMARY KEY (id),
    KEY fk_flyers_org (org_id),
    CONSTRAINT fk_flyers_org
        FOREIGN KEY (org_id)
        REFERENCES org (id)
        ON DELETE CASCADE
);

CREATE TABLE comments (
    id       BIGINT   NOT NULL AUTO_INCREMENT,
    user_id  BIGINT   NOT NULL,
    flyer_id BIGINT   NOT NULL,
    content  VARCHAR(500) NOT NULL,
    timestamp TIMESTAMP   NOT NULL,
    PRIMARY KEY (id),
    KEY fk_comments_user (user_id),
    KEY fk_comments_flyer (flyer_id),
    CONSTRAINT fk_comments_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_comments_flyer
        FOREIGN KEY (flyer_id)
        REFERENCES flyers (id)
        ON DELETE CASCADE
);

CREATE TABLE saved_flyers (
    id       BIGINT NOT NULL AUTO_INCREMENT,
    user_id  BIGINT,
    flyer_id BIGINT,
    PRIMARY KEY (id),
    KEY fk_saved_user (user_id),
    KEY fk_saved_flyer (flyer_id),
    CONSTRAINT fk_saved_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_saved_flyer
        FOREIGN KEY (flyer_id)
        REFERENCES flyers (id)
        ON DELETE CASCADE
);

CREATE TABLE user_feed (
    id      BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    org_id  BIGINT NOT NULL,
    PRIMARY KEY (id),
    KEY fk_feed_user (user_id),
    KEY fk_feed_org (org_id),
    CONSTRAINT fk_feed_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_feed_org
        FOREIGN KEY (org_id)
        REFERENCES org (id)
        ON DELETE CASCADE
);
